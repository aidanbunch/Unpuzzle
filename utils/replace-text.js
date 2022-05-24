

export function removeBackslashes(str) {
  return str.replace(/\\/g, "");
}

export function replaceHTMLTags(string) {
  return string
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/\&nbsp;/g, "")
    .replace(/(&quot\;)/g, '"')
    .replace(/\&aacute;/g, "")
    .replace(/\&Aacute;/g, "")
    .replace(/\&Eacute;/g, "")
    .replace(/\&eacute;/g, "")
    .replace(/\&Iacute;/g, "")
    .replace(/\&iacute;/g, "")
    .replace(/\&Ntilde;/g, "")
    .replace(/\&ntilde;/g, "")
    .replace(/\&Oacute;/g, "")
    .replace(/\&oacute;/g, "")
    .replace(/\&Uacute;/g, "")
    .replace(/\&uacute;/g, "")
    .replace(/\&Uuml;/g, "")
    .replace(/\&uuml;/g, "")
    .replace(/\&laquo;/g, "")
    .replace(/\&raquo;/g, "")
    .replace(/\&iquest;/g, "")
    .replace(/\&iexcl;/g, "")
    .replace(/\&euro;/g, "");
}