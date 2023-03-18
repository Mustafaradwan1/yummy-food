   let aside = document.querySelector('aside')
   let bars = document.querySelector('.bars');
   let close = document.querySelector('.close');
   let li = document.querySelectorAll('ul li')
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);

   bars.addEventListener('click',()=>{
      bars.style.display='none';
      close.style.display='block';
      aside.style.left='0px';
      li.forEach((ele)=>{
         ele.style.padding= '10px 0 0 0'
      })
})
   close.addEventListener('click',()=>{
      bars.style.display='block'
      close.style.display='none'
      aside.style.left='-200px'
      li.forEach((ele)=>{
         ele.style.padding= '300px 0 0 0'
      })
})
let row = document.querySelector('.row')
row.innerHTML = defoult();

async function defoult(){
   let a = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
   let b = await a.json();
   let c = b.meals;
   let cartona='';
   for(let i = 0;i<c.length;i++){
      cartona+=`
      <div class="col col-md-3 p-3" onclick="ditels(${c[i].idMeal})">
         <div class="box w-100 h-100">
            <div class="image w-100 h-100">
               <img class="w-100 h-100" src="${c[i].strMealThumb}">
            </div>
            <div class="text d-flex align-items-center px-2">
               <h2>${c[i].strMeal}</h2>
            </div>
         </div>
      </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;
}

async function searchbyname(lol){
   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${lol}`);
   let rus = await api.json();
   let result = rus.meals;
   displaysearch(result)
}
async function searchbyletter(lett){
   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${lett}`);
   let rus = await api.json();
   let result = rus.meals;
   displaysearch(result)
}
async function displaysearch(food){
   let cartona = '';
   for(let i = 0;i<food.length;i++){
      cartona+=`
      <div class="col col-md-3 p-3" onclick="ditels(${food[i].idMeal})">
         <div class="box">
            <div class="imgs w-100 h-100">
               <img class="w-100 h-100" src="${food[i].strMealThumb}">
            </div>
            <div class="text d-flex align-items-center px-2">
               <h2>${food[i].strMeal}</h2>
            </div>
         </div>
      </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;

}
async function catagory(){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let rusolt = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
   let rus = await rusolt.json()
   let r = rus.categories
   let cartona ='';
   for(let i = 0;i<r.length;i++){
      cartona+=`
         <div class="col col-lg-3 col-md-4 col-12 p-2">
            <div class="box" onclick="filterCategory('${r[i].strCategory}','c')">
               <div class="image w-100">
                  <img class="w-100" src="${r[i].strCategoryThumb}">
               </div>
               <div class="text px-2">
                  <h2>${r[i].strCategory}</h2>
                  <p>${r[i].strCategoryDescription.split(" ", 20).join(" ")}</p>
               </div>
            </div>
         </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;
   document.querySelector('.roww').innerHTML = '';
}
async function filterCategory(letter, char) {
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${letter}`);
   let result = (await data.json()).meals;
   cartona = '';
   for(let i=0;i<result.length;i++){
      cartona+=`
      <div class="col col-lg-3 col-md-4 col-12 p-2">
         <div class="box" onclick="ditels(${result[i].idMeal})">
            <div class="image w-100">
               <img class="w-100" src="${result[i].strMealThumb}">
            </div>
            <div class="text text-dis d-flex align-items-center justify-content-center ">
               <h2>${result[i].strMeal}</h2>
            </div>
         </div>
      </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;
}
async function ditels(id){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   const resultd = (await api.json()).meals[0];
   console.log(resultd)
   let cartona = `
   <div class="col col-lg-4 col-md-4">
      <div class="drop">
         <div class="image w-100">
            <img class="w-100" src="${resultd.strMealThumb}">
         </div>
         <h3 class="text-center text-white mt-3">${resultd.strMeal}</h3>
      </div>   
   </div>
   <div class="col col-lg-8 col-md-8">
      <div class="drop">
         <div class="text w-100">
         <h3 class="text-white">Instructions</h3>
         <p class=" text-white">${resultd.strInstructions}</p>
         <h3 class="text-white">area : ${resultd.strArea}</h3>
         <h3 class="text-white">Category : ${resultd.strCategory}</h3>
         
         <div class="hstack mt-4 gap-2">
            <a href="${resultd.strSource}" target="_blank" class="btn btn-success">Source</a>
            <a href="${resultd.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
         </div>
      </div>   
   </div>
   `;
   document.querySelector('.row').innerHTML = cartona;
}
async function Area(){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
   let rus = await api.json();
   let rusolt = rus.meals.slice(0, 20)
   let cartona ='';
   for(let i=0;i<rusolt.length;i++){
      cartona+=`
      <div class="col col-lg-3 col-md-4 text-center p-3">
         <div class="item" onclick="filterCategory('${rusolt[i].strArea}','a')">
            <i class="fa-solid fa-house text-danger fa-4x"></i>
            <p class="text-white fw-semibold mt-1 fs-5 ">${rusolt[i].strArea}</p>
         </div>
      </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;
   document.querySelector('.roww').innerHTML = '';
}
async function ingre(){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let api = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
   let rus = await api.json();
   let rusolt = rus.meals.slice(0, 20)
   let cartona = '';
   for(let i =0;i<rusolt.length;i++){
      cartona+=`
         <div class="col col-lg-3 col-md-4">
            <div class="item items" onclick="filterCategory('${rusolt[i].strIngredient}','i')">
            <i class="fa-solid fa-drumstick-bite fa-3x text-success bg-opacity-10"></i>
            <h3 class="text-white mt-2">${rusolt[i].strIngredient}</h3>
            <p class="text-white mt-2">${rusolt[i].strDescription.split(" ", 10).join(" ")}</p>
            </div>
         </div>
      `
   }
   document.querySelector('.row').innerHTML = cartona;
}
function contactus(){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let cartona= `
      <div class="col theinp">
         <form class="" action="">
            <div class="aleartinp">
               <input type="text" placeholder="enter your name">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Special characters and numbers not allowed
               </div>
            </div>
            <div class="aleartinp">
               <input type="email" placeholder="enter your email">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Email not valid *exemple@yyy.zzz
               </div>
            </div>
            <div class="aleartinp">
               <input type="text" placeholder="enter your phone">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Enter valid Phone Number
               </div>
            </div>
            <div class="aleartinp">
               <input type="number" placeholder="enter your age">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Enter valid age
               </div>
            </div>
            <div class="aleartinp">
               <input type="password" placeholder="enter your password">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
               </div>
            </div>
            <div class="aleartinp">
               <input type="password" placeholder="repassword">
               <div class="alert alert-danger invalid-feedback" role="alert">
                  Enter valid repassword
               </div>
            </div>
            <div class="inp">
               <input class="btn btn-danger disabled" id="sub"  type="submit" placeholder="submit">
            </div>
         </form>
      </div>
   `
   document.querySelector('.row').innerHTML = cartona;
   document.querySelector('.roww').innerHTML = '';
   let inputs = Array.from(document.querySelectorAll('.aleartinp input')) 
   console.log(inputs)
   let form = document.querySelector('form')
   form.addEventListener('input',()=>{
      function validname(){
         const reg = /^[a-zA-Z ]+$/;
         if(reg.test(inputs[0].value)){
            inputs[0].classList.add('is-valid')
            inputs[0].classList.remove('is-invalid')
            return true
         }else{
            inputs[0].classList.add('is-invalid')
            inputs[0].classList.remove('is-valid')
            return false
         }
      }
      function validemail(){
         const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         if(reg.test(inputs[1].value)){
            inputs[1].classList.add('is-valid')
            inputs[1].classList.remove('is-invalid')
            return true
         }else{
            inputs[1].classList.add('is-invalid')
            inputs[1].classList.remove('is-valid')
            return false
         }
      }
      function validnumber(){
         const reg = /^01[0125][0-9]{8}$/;
         if(reg.test(inputs[2].value)){
            inputs[2].classList.add('is-valid')
            inputs[2].classList.remove('is-invalid')
            return true
         }else{
            inputs[2].classList.add('is-invalid')
            inputs[2].classList.remove('is-valid')
            return false
         }
      }
      function validage(){
         const reg = /^([1-9]|[1-9][0-9]|100)$/;
         if(reg.test(inputs[3].value)){
            inputs[3].classList.add('is-valid')
            inputs[3].classList.remove('is-invalid')
            return true
         }else{
            inputs[3].classList.add('is-invalid')
            inputs[3].classList.remove('is-valid')
            return false
         }
      }
      function validpass(){
         const reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
         if(reg.test(inputs[4].value)){
            inputs[4].classList.add('is-valid')
            inputs[4].classList.remove('is-invalid')
            return true
         }else{
            inputs[4].classList.add('is-invalid')
            inputs[4].classList.remove('is-valid')
            return false
         }
      }
      function validreepass(){
         const reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
         if(reg.test(inputs[5].value)){
            inputs[5].classList.add('is-valid')
            inputs[5].classList.remove('is-invalid')
            return true
         }else{
            inputs[5].classList.add('is-invalid')
            inputs[5].classList.remove('is-valid')
            return false
         }
      }
      const button = document.getElementById('sub')
      if(validname() == true && validemail() == true && validnumber() == true && validage() == true && validpass() == true && validreepass() == true){
         button.classList.remove('disabled')
      }else{
         button.classList.add('disabled')
      }
   })
}



li.forEach((el)=>{
   el.addEventListener('click',(e)=>{
      if(e.target.getAttribute('id') === 'Search'){
   $(".layer").removeClass("d-none");
   setTimeout(() => {
      $(".layer").addClass("d-none");
   },1000);
   let cartona = `
   <div class="col col-md-6 px-2 pb-3">
      <div class="ser w-100"> <input class="w-100 py-2 px-3" type="search" id="name" placeholder="search by name"></div>
   </div>
   <div class="col col-md-6 px-2 pb-3">
      <div class="ser w-100"> <input class="w-100 py-2 px-3" type="search" maxlength="1" id="letter" placeholder="search by letter"></div>
   </div>
   <div class="col col-md-12 px-2" id="data">
      
   </div>
   `
   document.querySelector('.roww').innerHTML = cartona;
   document.querySelector('.row').innerHTML = '';
   let a = document.getElementById('name')
   a.addEventListener('input',()=>{
      searchbyname(a.value)
   })
let l = document.getElementById('letter')
l.addEventListener('input',()=>{
   searchbyletter(l.value);
   
})

      }else if(e.target.getAttribute('id') === 'Categories'){
         catagory()
      }else if(e.target.getAttribute('id') === 'Area'){
         Area()
      }else if(e.target.getAttribute('id') === 'Ingredients'){
         ingre()
      }else if(e.target.getAttribute('id') === 'Contact'){
         contactus()
      }else{

      }
   })
})