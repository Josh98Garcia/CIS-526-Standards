/** site.js 
 * You should add your JavaScript code to this file.  
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 

fetch()
*/

var ST = document.getElementById("StandardsTable");

function printItems(element, index, array){
  x = element;
  y = x.statement + "<br><br>" + x.description;
  
  let identifierRow = document.createElement('div');
  identifierRow.innerHTML = x.identifier;
  identifierRow.className = "identRow";
  ST.appendChild(identifierRow);
  let standardRow = document.createElement('div');
  standardRow.innerHTML = x.statement;
  standardRow.className = "standRow active";
  ST.appendChild(standardRow);
  let bothRow = document.createElement('div');
  bothRow.innerHTML = y;
  bothRow.className = "both";
  ST.appendChild(bothRow);
  let subconceptRow = document.createElement('div');
  subconceptRow.innerHTML = x.subconcept;
  subconceptRow.className = "subconRow";
  ST.appendChild(subconceptRow);
  let practicesRow = document.createElement('div');
  practicesRow.innerHTML = x.practices;
  practicesRow.className = "practRow";
  ST.appendChild(practicesRow);
  let moreRow = document.createElement('div');
  moreRow.style.cursor = 'pointer';
  moreRow.innerHTML = "more...";
  moreRow.className = "more active";
  moreRow.onclick = function() {
    this.className = "more";
    lessRow.className = "less active";
    bothRow.className = "both active";
    practicesRow.className = "practRow active";
    practicesRow.innerHTML = "Practices:<br>" + practicesRow.innerHTML;
    subconceptRow.className = "subconRow active";
    subconceptRow.innerHTML = "Subconcept: " + subconceptRow.innerHTML;
    standardRow.className = "standRow";
  };
  ST.appendChild(moreRow);
  let lessRow = document.createElement('div');
  lessRow.style.cursor = 'pointer';
  lessRow.innerHTML = "less...";
  lessRow.className = "less";
  lessRow.onclick = function() {
    moreRow.className = "more active";
    this.className = "less";
    bothRow.className = "both";
    practicesRow.className = "practRow";
    practicesRow.innerHTML = practicesRow.innerHTML.substr(14);
    subconceptRow.className = "subconRow";
    subconceptRow.innerHTML = subconceptRow.innerHTML.substr(12);
    standardRow.className = "standRow active";
  };
  ST.appendChild(lessRow);
}

function useXHR(){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
    JSON.parse(xhr.responseText).forEach(printItems);
  });
  xhr.onreadystatechange = function(event){
    if(xhr.readyState === 4 && xhr.status === 200) {
      JSON.parse(xhr.responseText).forEach(printItems);
    }
  }
  const url = "standards.json";
  xhr.open("GET", url);
  xhr.send();
}

window.addEventListener('load', function(){
  useXHR();
});

/*


function useXHR(){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
      displayForecast(JSON.parse(xhr.responseText));
  });
  xhr.onreadystatechange = function(event){
    if(xhr.readyState === 4 && request.status === 200) {
      displayForecast(JSON.parse(request.responseText));
    }
  }
  const url = "https://api.weather.gov/gridpoints/TOP/48,54/forecast";
  xhr.open("GET", url);
  xhr.send();
}

window.addEventListener('load', function(){
  useXHR();
});*/