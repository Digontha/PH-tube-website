
const loadData = async ()=>{
         
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
        const MainData = await response.json();
        const data = MainData.data
        // console.log(data)
        categoryButton(data)
}

const categoryButton = (data)=>{

    const categoryButtonContainer = document.getElementById("category-btn")
     data.forEach(category => {
        // console.log(category)
       
        
      const div = document.createElement("div");
      div.innerHTML=`
      <a onclick="cardContainerData('${category.category_id}')" class=" text-[#252525] hover:bg-red-600 hover:text-white text-[18px] font-normal bg-[#19191933] px-4 py-2 rounded-md cursor-pointer">
      ${category.category}
      </a>
      `
      categoryButtonContainer.appendChild(div)
     });
}


const cardContainerData= async (id)=>{
           
           const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
           const MainData = await response.json();
           const data = MainData.data;
        

        const notFound = document.getElementById('notFound');

        if(data.length <= 0){
          notFound.style.display = 'block';
      }
      else{
          notFound.style.display = 'none';
      }

      

        const cardContainer =document.getElementById("card-container");
          cardContainer.textContent=''
         data.forEach(videoData=>{
            
          
            const div = document.createElement("div")
            
            const verified = videoData.authors[0].verified
            const viewsString = videoData.others.posted_date
            const views =parseFloat(viewsString)
            // console.log(views)
            const totalSeconds = views // Example value, replace with your seconds

            const hours = Math.floor(totalSeconds / 3600);
            const remainingSeconds = totalSeconds % 3600;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            
            const formattedHours = hours.toFixed(0);
            const formattedMinutes = minutes.toFixed(0);
            const formattedSeconds = seconds.toFixed(0);
            
            const totalTime = formattedHours + "hr " + formattedMinutes + "min" + formattedSeconds + " sec";
            

            div.innerHTML=`
            
           
           <div> 
           <figure class="h-52 bg-gray-200 "><img src="${videoData.thumbnail}" alt="news" class="h-full w-96 rounded-md"/></figure>
          
           <small class="relative px-3 text-[#fff] rounded-lg top-[-24px] lg:left-56 bg-slate-900 ">${!isNaN(views)? `${totalTime}` : "0hr 0min 0sec"}</small>
           </div>
                <div class="card-body">


                  <div class="flex justify-between items-center gap-2">

                    <div class="">
                        <div class="flex-1 flex justify-start items-center gap-5">    
                            <img src=${videoData.authors[0].profile_picture} alt="" class="w-10 h-10 rounded-full">
                            <h1 class="text-xl font-bold mb-4">${videoData.title}</h1>
                        </div>

                        <div class="ml-[58px] ">
                         
                            <div class="flex items-center gap-3">
                            <p>${videoData.authors[0].profile_name}   <span>${verified ? '<i class="fa-solid fa-circle-check" style="color: #024bca;"></i>' : ''}</span></p>
                            <h1></h1>
                            
                            </div>
                            <div><p>${videoData.others.views}</p></div>
                        </div>
                    </div>
                </div>
    
         
            
            `
        cardContainer.appendChild(div)

        
        
         })

         
}

const newHtml = ()=>{
 
 window.location.href = 'blog.html'
 
}


cardContainerData('1000')

loadData()