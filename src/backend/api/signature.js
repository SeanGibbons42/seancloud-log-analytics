const crypto = require('crypto');
const url = require('url');

/*
File signature.js
Handles cryptographic signing of AWS api requests.
*/

exports.signature = function(method, reqURL, headers, payload, region, service){

  const codeprefix = "AWS4";
  const code = "secret code!";
  const date = isoDate();

  const canonicalRequest = canonicalize(method, url, reqURL, payload);
  const strToSign = signatureStr(canonicalRequest, region, service);

  const dateKey = HMAC(codeprefix+code, date);
  const dateRegKey = HMAC(dateKey, region);
  const dateRegServKey = HMAC(dateRegKey, service);
  const signKey = HMAC(dateRegServKey, "aws4_request");

  return HMAC(signKey, strToSign);
}

function HMAC(key, string){
  const dateKey = crypto.createHmac('sha256', key).digest(string).toString("hex");
}

function canonicalize(method, url, headers, payload){
  /* takes request information and returns the AWS canonical request as specified here:
     https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
  */
  //process the request URL
  const reqURL = new URL(url);
  const sha256 = crypto.createHash('sha256');

  let query = encodeURI(reqURL.search);
  query = query.slice(0, query.length-1);
  let path  = encodeURI(reqURL.pathname);

  //case where path is empty
  if(path===""){
    path = "/";
  }
  //process the query qstring
  query = sortQString(query);
  headerdata = sortHeaders(headers);

  creq =  ""+method+"\n";
  creq += path + "\n";
  creq += query + "\n";
  creq += headerdata.headers + "\n";
  creq += headerdata.sheaders + "\n";
  creq += sha256.digest(payload).toString("hex");

  return creq;
}

function signatureStr(creq, region, service){
  /*
  Returns the string to be signed, given the
  canonical request [creq], aws region, and aws service.
  */
  const sha256 = crypto.createHash('sha256');

  sigStr = "AWS4-HMAC-SHA256" + "\n";
  sigStr += isoDateTime() + "\n";
  sigStr += isoDate() + "/" + region + "/" + service + "/aws4_request" + "\n";
  sigStr += sha256.digest(creq);

  return sigStr;
}

function sortQString(qstring){
  qparams = qstring.split("&");
  //split params
  qparams = qparams.map((param)=> param.split("=") );
  //URI encode each param and its value!
  qparams = qparams.map( (param)=> encodeQueryParam(param) );
  //sort
  qparams = qparams.sort();
  //re-package
  qparams = qparams.map( (param)=>(param[0]+"="+param[1]) );
  //reduce back to processed canonical qstring
  qparams = qparams.reduce( (canQString, param)=> (canQString + param + "&"), "" );
  //we need to cut off the extra "&" sign!
  return qparams.slice(0,-1);
}

function sortHeaders(headers){
  /*
  Accepts object containing header names and values, and returns a list of canonical headers.
  */
  names = headers.keys()
  //get an array of canonical header names and values.
  canHeaders = names.map( (name) => ( [name.toLowerCase(), header[name].trim()] ) );
  //now sort them alphabetically by header names
  canHeaders = canHeaders.sort( (a, b) => ( a[0].localeCompare(b[0]) ) );
  //finally, build the header lines for the request, then the list of signed headers
  reqHeaders = canHeaders.reduce( (hString, header) => ( hString+header+":"+"\n" ), "" );
  sigHeaders = canHeaders.reduce( (hString, header)=>( hString+header+";" ), "");

  return {
    headers: reqHeaders.slice(0,-1),
    sheaders: sigHeaders.slice(0,-1)
  };
}

function encodeQueryParam(param){
  /*  accepts a query string parameter and returns its components encoded
      in canonical form. If there is no value, an empty string will be set.
   */
  if(URIComponent.length === 1){
    return [encodeURIComponent(param[0]), ""];
  } else{
    return [encodeURIComponent(param[0]), encodeURIComponent(param[1])];
  }
}

function isoDate(){
  /*
  returns the current date in the format YYYYMMDD
  */
  const date = new Date();

  const dateSTR = date.getFullYear().toString();
  const monSTR  = (date.getMonth()+1).toString().padStart(2,"0");
  const daySTR  = date.getDate().toString().padStart(2, 0);

  return dateSTR + monSTR + daySTR;
}

function isoDateTime(){
  /*
  returns the current datetime in the format YYYYMMDD'T'HHMMSS'Z'
  */
  const date = new Date();

  const dateSTR = date.getFullYear().toString();
  const monSTR  = (date.getMonth()+1).toString().padStart(2,"0");
  const daySTR  = date.getDate().toString().padStart(2, 0);

  const hourSTR = date.getHours().toString().padStart(2, "0");
  const minSTR  = date.getMinutes().toString().padStart(2, "0");
  const secSTR  = date.getSeconds().toString().padStart(2, "0");

  return dateSTR + monSTR + daySTR + "T" + hourSTR + minSTR + secSTR + "Z";
}
