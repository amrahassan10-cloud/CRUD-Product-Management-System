

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

const deleteall = document.getElementById('deleteall'); 


let mode='create';

let tmp;


//get total
function gettotal(){

  if(price.value != ''){
      let result= (+price.value + +taxes.value + +ads.value )- +discount.value;
      total.innerHTML= result;
      total.style.background= '#040';
  }
  else{
    total.innerHTML= '';
    total.style.background='rgba(224, 107, 107, 0.32)';
     
  }
}

//create project 


let datapro;

if(localStorage.product != null){
datapro=JSON.parse(localStorage.product)
}else{
  datapro=[];
}


//validate
function validateInput(input, placeholderText) {
  if (input.value.trim() === '') {
    input.placeholder = `Please type ${placeholderText}`;
    input.style.background = 'rgba(184, 65, 65, 0.51)'; // أحمر فاتح
    input.focus();
    return false;
  } else {
    input.placeholder = placeholderText;
    input.style.background = '#111'; // أسود
    return true;
  }
}






submit.onclick= function(){


// Validate title, price, category
  let isTitleValid = validateInput(title, 'Title');
  let isPriceValid = validateInput(price, 'Price');
  let isCategoryValid = validateInput(category, 'Category');


  if (!isTitleValid || !isPriceValid || !isCategoryValid) {
    return; // لو فيه حاجة ناقصة، وقف
  }

let newpro={
      title:title.value,
      price:price.value,
      taxes:taxes.value, 
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value,
}
if(mode =='create'){
if(newpro.count>1 &&newpro.count<100){
for(let i= 0;i<newpro.count;i++){

  datapro.push(newpro);

}
}
else{
if(title.value !='' && price.value !='' &&category.value !='' &&newpro.count <100) {
datapro.push(newpro);
}
}
}

else{
datapro[tmp]=newpro;
  mode='create';
  submit.innerHTML='create';
count.style.display='block';
}



localStorage.setItem('product',JSON.stringify(datapro))

console.log(datapro)

cleardata()
showdata()



}



title.onkeyup = () => validateInput(title, 'Title');
price.onkeyup = () => validateInput(price, 'Price');
category.onkeyup = () => validateInput(category, 'Category');








title.onkeyup =function() {
  if (title.value != '') {
    title.style.background = '#111'; 
    title.placeholder = 'Title';
  }
};


//clear inputs

function cleardata(){
    title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';
}

//read

function showdata(){

gettotal();

let table='';
for(let i=0;i<datapro.length;i++){
  
if (datapro[i] !== null){
table +=`
     <tr>
     <td>${i}</td>
     <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button onclick="updatedata(${i})"   id="update"> update</button></td>
     <td><button onclick="deletedata(${i})" id="delete"> delete</button></td>
     </tr>
 
`

if(table != ''){

deleteall.classList.remove('hide');

deleteall.innerHTML=`delete all (${i+1})`;

}
}

}
document.getElementById('tbody').innerHTML=table;

}


//delete all elemnts
  function removeall(){
  datapro = []; // فضي المصفوفة كلها
  localStorage.removeItem('product'); // امسح البيانات من localStorage
  showdata(); // اعمل إعادة عرض للجدول (هيظهر فاضي)
   deleteall.classList.add('hide');
    }


// delete data from one elemnt

function deletedata(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showdata()
}

//update elemnts 

function updatedata(i){
title.value=datapro[i].title
price.value=datapro[i].price
taxes.value=datapro[i].taxes
discount.value=datapro[i].discount
ads.value = datapro[i].ads;
gettotal();
count.style.display='none';
submit.innerHTML='update';
category.value=datapro[i].category;
mode ='update';
tmp=i;
scroll({
  top:0,
  behavior:'smooth'

});


}


















