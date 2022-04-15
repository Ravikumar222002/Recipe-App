const searchBtn=document.getElementById("search-btn");
 
 const mealList=document.getElementById("meal");
 
 const recipeCloseBtn=document.getElementById("recipe-close-btn");
 
 const mealContentDetails=document.getElementById("meal-content-details");
 



 /*event fire on search btn */
 searchBtn.addEventListener("click",getRecipeList);
 
 /* event fire on meal */
 mealList.addEventListener("click",getMealRecipe);
 
 recipeCloseBtn.addEventListener("click",()=>{
     
     mealContentDetails.parentElement.classList.remove("showRecipe");
    
     
 })

 
 /* show search recipe in search box */
 function getRecipeList()
 {
     let showmeals=document.getElementById("search-area").value.trim();
     
     
     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${showmeals}`)
     .then((response)=>
     {
         return response.json();
     })
     .then((data)=>{    
      //console.log(JSON.stringify(data));
       
       let html="";
       
       if(data.meals)
       {
           data.meals.forEach(meals =>
           {
              html+=`
                     <div class="meal-items" data-id="${meals.idMeal}">
                       <div class="meal-img">
                          
                          <img src="${meals.strMealThumb}">     
                       </div>
                       <div class="meal-name">
                           <h3 class="title">${meals.strMeal}</h3>
                           <a href="#" class="recipe-btn" id="go-recipe">Go recipe</a>
                       </div>   
                </div> 
                
              `;
              
           })
       }
       else{
          
           html="Sorry, We didn't find any meal";
           mealList.classList.add("not-found");
           
       }
     
        mealList.innerHTML=html;          
        
     })
     
 }
 
 
 

function getMealRecipe(e)
{
   e.preventDefault();
      
   if(e.target.classList.contains("recipe-btn"))
   {
       
     let mealList=e.target.parentElement.parentElement;
     
    // console.log(mealList.dataset.id);
    
     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealList.dataset.id}`)
     .then((response)=>{
         
         return response.json();
     })
     .then((data)=>{
         
        // console.log(JSON.stringify(data))
        
          mealRecipeModal(data.meals)
     })
               
   }
     
}

/* make meal recipe modal(popup)*/

function mealRecipeModal(meals)
{
  
 //console.log(JSON.stringify(meals))  
 
    meal=meals[0];
    
    let html=`
                          
      <h2 class="meal-title">${meal.strMeal}</h2>
      
        <p class="category-name">${meal.strCategory}</p>
        
        <div class="recipe-instruction">
            <h3 class="Instructions :-">Instructions</h3>
            
            <p>${meal.strInstructions} </p>
        </div>
        
        <div class="recipe-meal-img">
           <img src="${meal.strMealThumb}">   
        </div>
        
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch video</a>
        </div>
                          
             `;
             
             
     mealContentDetails.innerHTML=html;  
      
      mealContentDetails.parentElement.classList.add("showRecipe");
    
        
}

     
