export const  get_filesize = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
  //  to get only the header
  xhr.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      callback(parseInt(xhr.getResponseHeader("Content-Length")));
    }
  };
  xhr.send();
}