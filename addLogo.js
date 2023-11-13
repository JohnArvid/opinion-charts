
/*  Needs some work, 
    logos overlap some charts
    becomes very big in fullwidth charts
    should be appended instead of prepended
    in tables.
*/
function addLogo() {
  let css = 'position: relative; top: 16%; width: 17%; z-index: 10000; right: -67%; max-width: 145px;'
  let src = 'https://www.indikator.org/wp-content/uploads/2023/06/Logo_temp.png'
  let nodes = document.querySelectorAll('.chart');
  
  
  // for (let node of nodes) {
  //   // let div = document.createElement('div');
  //   let logo = document.createElement('img');
  //   logo.setAttribute('src', src);
  //   logo.setAttribute('style', css);
  //   node.prepend(logo);
  // }
  for (let node of nodes) {
  // let div = document.createElement('div');
  let logo = document.createElement('img');
  logo.setAttribute('src', src);
  logo.setAttribute('style', css);
  if (node.classList.contains("table")) {
    node.append(logo);
  } else {
  node.prepend(logo);
  }
}
}




// container div css: 
// {
//     display: flex;
//     flex-flow: column;
//     align-items: end;
//     margin: 0px 12%;
//     position: relative;
//     top: 16%;
// }

// img style: 
  // {
  //   z-index: 10000;
  //   max-width: 145px;
  // }


