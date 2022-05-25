//Pure HTML, CSS and JavaScript - WhatIsMyIp 


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
	  
   imgSrc = "https://www.countryflagicons.com/FLAT/64/" + data.country_code + ".png";
   imgTag.setAttribute('src', imgSrc);
   imgTag.setAttribute('title', data.country_name);
   document.getElementById('flag').appendChild(imgTag);
   document.getElementById('ip').innerText = data.ip;
   document.getElementById('location').innerText = `${data.city}, ${data.country_name}`;
  });
  document.getElementById('machine-name').innerText = OSName;
  document.getElementById('cookies').innerText = navigator.cookieEnabled ? "Enabled" : "Disabled";
  document.getElementById('screen-resolution').innerText = window.screen.width * window.devicePixelRatio + ' x ' + window.screen.height * window.devicePixelRatio;
  
  document.getElementById("cpu").innerText = GetCPU();
  
});

function GetSystemInfo()
{
  document.getElementById("os").innerHTML = "OS: " + GetOS();
  document.getElementById("browser").innerHTML = "Browser: " + GetBrowser();
  document.getElementById("res").innerHTML = "Resolution: " + GetResolution();
  document.getElementById("cpu").innerHTML = "CPU: " + GetCPU();
  document.getElementById("gpu").innerHTML = "GPU: " + GetGPU();
  document.getElementById("down").innerHTML = "Download: " + GetDownload();
  GetIP().then(function(ip){
    document.getElementById("ip").innerHTML = "IP: " + ip;
  });
  GetBattery().then(function(battery){
    document.getElementById("batt").innerHTML = "Battery: " + battery.level * 100 + "%, " + (battery.charging ? "charging" : "not charging");
  });
  
}

function GetOS()
{
  var Name = "Not known"; 
  if (navigator.appVersion.indexOf("Win") != -1) Name =  
    "Windows OS"; 
  if (navigator.appVersion.indexOf("Mac") != -1) Name =  
    "MacOS"; 
  if (navigator.appVersion.indexOf("X11") != -1) Name =  
    "UNIX OS"; 
  if (navigator.appVersion.indexOf("Linux") != -1) Name =  
    "Linux OS"; 
  
  return Name;
}

function GetBrowser()
{
  var sBrowser, sUsrAg = navigator.userAgent;

  // The order matters here, and this may report false positives for unlisted browsers.

  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = "unknown";
  }
  
  return sBrowser;
}

function GetResolution()
{
  return window.innerWidth + "x" + window.innerHeight;
}

function GetCPU()
{
  return navigator.hardwareConcurrency + " logical processors available";
}

function GetGPU()
{
  const gl = document.createElement('canvas').getContext('webgl');
  if (!gl)
    return "No WebGL"
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "No WEBGL_debug_renderer_info";
}

async function GetBattery()
{
  try {
    let battery = await navigator.getBattery();
    return battery;
  } catch(e) {
    return "No battery info!";
  }
}

async function GetIP()
{
  try {
    let response = await fetch('https://api.ipify.org?format=json');
    let json = await response.json();
    return json.ip;
  } catch(e) {
    return "Cannot get IP!";
  }
  
}

function GetDownload()
{
//   var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; 
//   var downloadSize = 4995374; //bytes

//   var startTime, endTime;
//   var download = new Image();
//   download.onload = function () {
//     endTime = (new Date()).getTime(); 
//   }
    
//   startTime = (new Date()).getTime();
//   var cacheBuster = "?nnn=" + startTime;
//   download.src = imageAddr + cacheBuster;
  
//   var duration = (endTime - startTime) / 1000;
//   var bitsLoaded = downloadSize * 8;
  
//   console.log(duration);
//   return ((bitsLoaded / duration) / 1048576).toFixed(2);
  try {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    console.log(connection);
    return connection.downlink + "Mbps";
  } catch(e) {
    return "No connection info!";
  }
  
   
}

GetSystemInfo();
