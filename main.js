let spinner=document.querySelector(".myspiner");
let mainpart=document.querySelector(".alldata-wrapper");
let searchbook=document.getElementById("searchbook");
let total=document.querySelector(".totalresult");

/* search handler */
document.getElementById("btn-search").addEventListener("click",()=>{

    
    let searchText=searchbook.value;
    mainpart.innerHTML="";
        if(searchText===""){
            searchbook.value="";
            total.innerHTML="";
            spinner.style.display="none";
            mainpart.innerHTML="<h2 class='text-center'>Your search field is empty</h2>"
        }else{
            spinner.style.display="block";
            fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res=>res.json()).then(data=>getsearchData(data));
            searchbook.value="";
            total.innerHTML="";

        }

   
});

/* Data get here */
let getsearchData=(data)=>{
    
    let alldata=data.docs;
    console.log(alldata.length)
    let totalresult=0;

    if(alldata.length===0){
        total.innerHTML="";
        mainpart.innerHTML="<h2 class='text-center'>You do not have any data</h2>";    
    }else{
        alldata.forEach((book)=>{
        
            let creatediv=document.createElement("div");
            creatediv.classList.add("col-md-4","mb-4");
          
            creatediv.innerHTML=`<div class="card">
                                   <img height="200" src="${book.cover_i?'https://covers.openlibrary.org/b/id/'+book.cover_i+'-M.jpg':'No-Photo-Available.png'}"class="card-img-top" alt="...">
                                   <div class="card-body">
                                   <h5 class="card-title">book name: ${book.title}</h5>
                                   <h5 class="card-text text-danger">author name: ${book.author_name?book.author_name[0]:'no author'}</h5>
                                   <h5 class="card-title">publish data: ${book.publish_date?book.publish_date[0]:"not found"}</h5>
                                   <h5 class="card-title text-primary">publisher name: ${book.publisher?book.publisher[0]:"not found"}</h5>
                                   </div>
                               </div>`;
   
                              
                               mainpart.appendChild(creatediv);
                               totalresult+=1;
          
      });
    }
   
  
   total.innerHTML=`<h2 class="text-center text-danger mb-5">Total result is ${totalresult}</h2>`
   spinner.style.display="none";
   


}