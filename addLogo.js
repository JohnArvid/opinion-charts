


function addLogo() {
  let css = "display: flex; flex-flow: column; align-items: end; margin: 0px 12%; position: relative; top: 16%;";
  let tableCss = "display: flex; flex-flow: column; align-items: end; margin: 0; position: relative; top: 0;";
  let src = 'https://www.indikator.org/wp-content/uploads/2023/06/Logo_temp.png';
  let nodes = document.querySelectorAll('.chart');
  
  
 
  for (let node of nodes) {
    let div = document.createElement('div');

    div.innerHTML = `<img src=${src} style='z-index: 10000; width: 145px; max-width: 20%;'/>`

    if (node.classList.contains("table")) {
      div.setAttribute("style", tableCss);
      node.prepend(div);
    } else {
      div.setAttribute("style", css);
      node.prepend(div);
    }
  }
}

