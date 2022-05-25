//JavaScript - WhatIsMyIp 


window.addEventListener('load', function() {
  var imgTag = document.createElement('img');
  var imgSrc = '';
  var OSName = "Unknown";
if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
 fetch('https://geo.qualaroo.com/json/')
  .then(response => response.json())
  .then((data) => {
   imgSrc = "https://www.countryflags.io/" + data.country_code + "/flat/32.png";
   imgTag.setAttribute('src', imgSrc);
   imgTag.setAttribute('title', data.country_name);
   document.getElementById('flag').appendChild(imgTag);
  document.getElementById('ip').innerText = data.ip;
   document.getElementById('location').innerText = `${data.city}, ${data.country_name}`;
  });
  document.getElementById('machine-name').innerText = OSName;
  document.getElementById('cookies').innerText = navigator.cookieEnabled ? "Enabled" : "Disabled";
  document.getElementById('screen-resolution').innerText = window.screen.width * window.devicePixelRatio + ' x ' + window.screen.height * window.devicePixelRatio;
});
