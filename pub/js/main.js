"use strict";var URL="https://studenter.miun.se/~joro1803/dt173g/projekt/backend/educationlist.php/education/";function addEducation(){var e=document.getElementById("hie").value,t=document.getElementById("name").value,n=document.getElementById("credits").value,d=document.getElementById("startdate").value,a=document.getElementById("enddate").value;""!=e&&""!=t&&""!=n&&""!=d&&""!=a||location.reload(),isNaN(n)&&(alert("Ange ett numreriskt värde för antal högskolepoäng!"),location.reload());var o=JSON.stringify({hie:e,name:t,credits:n,startdate:d,enddate:a});event.preventDefault(),fetch(URL,{method:"POST",body:o}).then(function(e){return e.json()}).then(function(e){return clearEducationFields()}).catch(function(e){return console.log(e)})}function getEducation(){document.getElementById("updateEducationForm").style.display="none",fetch(URL).then(function(e){return e.json()}).then(function(e){var t="";e.forEach(function(e){t+="<article class = 'box-wrapper'><div class = 'educationBox'><p><span class ='lead-text'>Lärosäte: </span>"+e.hie+"</p><p><span class ='lead-text'>Utblidning: </span>"+e.name+"</p><p><span class ='lead-text'>Högskolepoäng: </span>"+e.credits+"</p><p><span class ='lead-text'>Startdatum: </span>"+e.startdate+"</p><p><span class ='lead-text'>Slutdatum: </span>"+e.enddate+'</p></div><div class ="button-box"><button class ="update-button" onClick="updateEducationSend(this.id,\''+e.hie+"', '"+e.name+"', '"+e.credits+"', '"+e.startdate+"',  '"+e.enddate+"'  )\"id="+e.id+">Uppdatera # "+e.id+"</button><button class ='delete-button' onclick ='deleteEducation(this.id)' id ="+e.id+">Radera # "+e.id+"</button></div></article>"}),document.getElementById("output").innerHTML=t}).catch(function(e){return console.log(e)})}function deleteEducation(e){$("#deleted-div").addClass("on"),$("#deleted-div").one(animationEvent,function(e){$("#deleted-div").removeClass("on")}),fetch(URL+e+"/",{method:"DELETE"}).then(function(e){return getEducation()}).catch(function(e){return console.log(e)})}function updateEducation(){var e=document.getElementById("educationId").value,t=document.getElementById("updateHie").value,n=document.getElementById("updateName").value,d=document.getElementById("updateCredits").value,a=document.getElementById("updateStartdate").value,o=document.getElementById("updateEnddate").value,u=JSON.stringify({hie:t,name:n,credits:d,startdate:a,enddate:o});event.preventDefault(),fetch(URL+"/"+e,{method:"PUT",body:u}).then(function(e){return e.json()}).then(function(e){return getEducation()}).catch(function(e){return console.log(e)})}function updateEducationSend(e,t,n,d,a,o){document.getElementById("updateEducationForm").style.display="block",document.getElementById("educationId").value=e,document.getElementById("updateHie").value=t,document.getElementById("updateName").value=n,document.getElementById("updateCredits").value=d,document.getElementById("updateStartdate").value=a,document.getElementById("updateEnddate").value=o}function clearEducationFields(){document.getElementById("hie").value="",document.getElementById("name").value="",document.getElementById("credits").value="",document.getElementById("startdate").value="",document.getElementById("enddate").value="",getEducation()}var animationEvent="webkitAnimationEnd oanimationend msAnimationEnd animationend";function closeUpdateBox(){document.getElementById("updateEducationForm").style.display="none"}$(".add-button").click(function(){$("#added-div").addClass("on"),$("#added-div").one(animationEvent,function(e){$("#added-div").removeClass("on")})}),$(".form-update-button").click(function(){$("#updated-div").addClass("on"),$("#updated-div").one(animationEvent,function(e){$("#updated-div").removeClass("on")})}),$(document).ready(function(){$("#mobile-menu").on("click",function(){$(this).toggleClass("open")})}),$(document).ready(function(){$("#mobile-menu").on("click",function(){$("#main-nav ul").toggleClass("open")})});var JOBURL="https://studenter.miun.se/~joro1803/dt173g/projekt/backend/joblist.php/jobs/";function addJob(){var e=document.getElementById("workplace").value,t=document.getElementById("title").value,n=document.getElementById("startdatejob").value,d=document.getElementById("enddatejob").value;""!=e&&""!=t&&""!=n&&""!=d||location.reload();var a=JSON.stringify({workplace:e,title:t,startdate:n,enddate:d});event.preventDefault(),fetch(JOBURL,{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){return clearJobFields()}).catch(function(e){return console.log(e)})}function getJobs(){document.getElementById("updateJobForm").style.display="none",fetch(JOBURL).then(function(e){return e.json()}).then(function(e){var t="";e.forEach(function(e){t+="<article class = 'box-wrapper'><div class = 'jobBox'><p><span class ='lead-text'>Arbetsplats: </span>"+e.workplace+"</p><p><span class ='lead-text'>Arbetstitel: </span>"+e.title+"</p><p><span class ='lead-text'>Startdatum: </span>"+e.startdate+"</p><p><span class ='lead-text'>Slutdatum: </span>"+e.enddate+'</p></div><div class ="button-box"><button class ="update-button" onClick="updateJobSend(this.id,\''+e.workplace+"', '"+e.title+"', '"+e.startdate+"',  '"+e.enddate+"'  )\"id="+e.id+">Uppdatera # "+e.id+"</button><button class ='delete-button' onclick ='deleteJob(this.id)' id ="+e.id+">Radera #"+e.id+"</button></div></article>"}),document.getElementById("outputjobs").innerHTML=t}).catch(function(e){return console.log(e)})}function deleteJob(e){$("#deleted-div").addClass("on"),$("#deleted-div").one(animationEvent,function(e){$("#deleted-div").removeClass("on")}),fetch(JOBURL+e+"/",{method:"DELETE"}).then(function(e){return getJobs()}).catch(function(e){return console.log(e)})}function updateJob(){var e=document.getElementById("jobId").value,t=document.getElementById("updateWorkplace").value,n=document.getElementById("updateTitle").value,d=document.getElementById("updateStartdatejob").value,a=document.getElementById("updateEnddatejob").value,o=JSON.stringify({workplace:t,title:n,startdate:d,enddate:a});event.preventDefault(),fetch(JOBURL+"/"+e,{method:"PUT",body:o}).then(function(e){return e.json()}).then(function(e){return getJobs()}).catch(function(e){return console.log(e)})}function updateJobSend(e,t,n,d,a){document.getElementById("updateJobForm").style.display="block",document.getElementById("jobId").value=e,document.getElementById("updateWorkplace").value=t,document.getElementById("updateTitle").value=n,document.getElementById("updateStartdatejob").value=d,document.getElementById("updateEnddatejob").value=a}function clearJobFields(){document.getElementById("workplace").value="",document.getElementById("title").value="",document.getElementById("startdatejob").value="",document.getElementById("enddatejob").value="",getJobs()}window.onload=function(){getWebpages(),getJobs(),getEducation()};var WEBPAGEURL="https://studenter.miun.se/~joro1803/dt173g/projekt/backend/webpagelist.php/webpages/";function addWebpage(){var e=document.getElementById("webpagetitle").value,t=document.getElementById("webpageurl").value,n=document.getElementById("webpagedescription").value;""!=e&&""!=t&&""!=n||location.reload();var d=JSON.stringify({title:e,url:t,description:n});event.preventDefault(),fetch(WEBPAGEURL,{method:"POST",body:d}).then(function(e){return e.json()}).then(function(e){return clearWebpageFields()}).catch(function(e){return console.log(e)})}function getWebpages(){document.getElementById("updateWebpageForm").style.display="none",fetch(WEBPAGEURL).then(function(e){return e.json()}).then(function(e){var t="";e.forEach(function(e){t+="<article class = 'box-wrapper'><div class = 'webpageBox'><p><p><span class ='lead-text'>Titel: </span>"+e.title+"</p><p><span class ='lead-text'>URL: </span>"+e.url+"</p><p><span class ='lead-text'>Beskrivning: </span>"+e.description+'</p></div><div class ="button-box"><button class ="update-button" onClick="updateWebpageSend(this.id,\''+e.title+"', '"+e.url+"',  '"+e.description+"'  )\"id="+e.id+">Uppdatera # "+e.id+"</button><button class ='delete-button' onclick ='deleteWebpage(this.id)' id ="+e.id+">Radera #"+e.id+"</button></div></article>"}),document.getElementById("outputwebpages").innerHTML=t}).catch(function(e){return console.log(e)})}function deleteWebpage(e){$("#deleted-div").addClass("on"),$("#deleted-div").one(animationEvent,function(e){$("#deleted-div").removeClass("on")}),fetch(WEBPAGEURL+e+"/",{method:"DELETE"}).then(function(e){return getWebpages()}).catch(function(e){return console.log(e)})}function updateWebpage(){var e=document.getElementById("webpageId").value,t=document.getElementById("updateWebpagetitle").value,n=document.getElementById("updateWebpageurl").value,d=document.getElementById("updateWebpagedescription").value,a=JSON.stringify({title:t,url:n,description:d});event.preventDefault(),fetch(WEBPAGEURL+"/"+e,{method:"PUT",body:a}).then(function(e){return e.json()}).then(function(e){return getWebpages()}).catch(function(e){return console.log(e)})}function updateWebpageSend(e,t,n,d){document.getElementById("updateWebpageForm").style.display="block",document.getElementById("webpageId").value=e,document.getElementById("updateWebpagetitle").value=t,document.getElementById("updateWebpageurl").value=n,document.getElementById("updateWebpagedescription").value=d}function clearWebpageFields(){document.getElementById("webpagetitle").value="",document.getElementById("webpageurl").value="",document.getElementById("webpagedescription").value="",getWebpages()}