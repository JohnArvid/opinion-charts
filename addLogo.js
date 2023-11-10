




let css = 'position: relative; top: 16%; width: 17%; z-index: 10000; right: -67%;'
let url = 'https://www.indikator.org/wp-content/uploads/2023/06/Logo_temp.png'
let element = document.getElementById('changeChart');
let img = document.createElement('img');
img.setAttribute('src', url);
img.setAttribute('style', css);
element.prepend(img);