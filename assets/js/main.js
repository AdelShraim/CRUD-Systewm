var nameInput = document.getElementById("name");
var price= document.getElementById("price");
var qty = document.getElementById("qty");
var desc = document.getElementById("desc");
var cat = document.getElementById("cat");

var addBtn = document.getElementById("add-btn");
var body = document.getElementById("body");
var deletebtn = document.getElementById("delete");
var btns = document.getElementById("btns");
var keyword = document.getElementById("keyword");
var updateBtn = document.getElementById("update-btn");

updateBtn.style.display="none"

var courses = [];

display()



addBtn.onclick = function(e){
    e.preventDefault();

    var course = {
       name: nameInput.value,
       price: price.value,
       qty: qty.value,
        desc: desc.value,
        cat: cat.value
    }   

    var errors = 0
    if(course.name.length <5){
      errors++;
      nameInput.classList.add("is-invalid")


    }else{
      errors--;
      nameInput.classList.remove("is-invalid")
      nameInput.classList.add("is-valid")


    }
    if(isNaN(course.price)||!course.price){
      errors++;
      price.classList.add("is-invalid")


    }else{
      errors--;
      price.classList.remove("is-invalid")
      price.classList.add("is-valid")


    }
    if(isNaN(course.qty)||!course.qty){
      errors++;
      qty.classList.add("is-invalid")


    }else{
      errors--;
      qty.classList.remove("is-invalid")
     qty.classList.add("is-valid")


    }
    if(!course.desc){
      errors++;
      desc.classList.add("is-invalid")


    }else{
      errors--;
      desc.classList.remove("is-invalid")
      desc.classList.add("is-valid")


    }
    if(!course.cat){
      errors++;
      cat.classList.add("is-invalid")


    }else{
      errors--;
      cat.classList.remove("is-invalid")
      cat.classList.add("is-valid")


    }
courses.push(course);
display()
clear()
Swal.fire(
    'Good job!',
    'You add course',
    'successfully'
  )

  localStorage.setItem('courses',JSON.stringify(courses))

}


deletebtn.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses = []
            //localstorage
            localStorage.setItem('courses',JSON.stringify(courses))
            display()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}
//search
keyword.onkeyup = function(){
    //console.log(keyword.value)
    var keyW = keyword.value
   
    var data=``

   
        for(var i=0;i<courses.length;i++ ){
            if(courses[i].name.toLowerCase().includes(keyW.toLowerCase()) ||  courses[i].cat.toLowerCase().includes(keyW.toLowerCase()) || courses[i].desc.toLowerCase().includes(keyW.toLowerCase()) ){
                 data +=`
                <tr>
                <td>${i+1}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].cat}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].qty}</td>
                <td>
                    <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
        
                </td>
            </tr>
            `
            }
        }
       body.innerHTML = data

    
}




//display data
function display(){
    var data=``;

    for(var i=0;i<courses.length;i++){
        data +=`<tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].cat}</td>
        <td>${courses[i].desc}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].qty}</td>
        <td>
            <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
            <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>

        </td>
    </tr>`

    }
    body.innerHTML=data;
}
//clear data
function clear(){
    nameInput.value = ""
    price.value = ""
    qty.value = ""
    cat.value = ""
    desc.value = ""

}

//delete data 
function deleteCourse(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i,1)
            display()
            localStorage.setItem('courses',JSON.stringify(courses))

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}

//edit
function edit(i){
    nameInput.value = courses[i].name
    price.value = courses[i].price
    qty.value = courses[i].qty
    desc.value = courses[i].desc
    cat.value = courses[i].cat

/*btns.innerHTML = `
 <button type="button" onclick="update(${i})" id="update-btn" class="btn btn-primary">update</button> 
 
`*/
updateBtn.onclick = function(){
  update(i)
}

addBtn.style.display="none"
updateBtn.style.display="inline-block"


}

//update

function update(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed) {
            var course = {
                name: nameInput.value,
                price: price.value,
                qty: qty.value,
                 desc: desc.value,
                 cat: cat.value
             }   
             courses[i]=course
            /* btns.innerHTML=`
            
             `*/
             display()
             clear()
             addBtn.style.display="inline-block"
             updateBtn.style.display="none";

             localStorage.setItem('courses',JSON.stringify(courses))

           
          Swal.fire(
            'Updated!',
            'Your Course has been Updated.',
            'success'
          )
        }else{
            clear()
            addBtn.style.display="inline-block"
            updateBtn.style.display="none";
      
        }
      })
  
    

}




/*var courses = [
  {title:"html"},
  {title:"php"},
  {title:"js"},
]*/

localStorage.setItem('courses',JSON.stringify(courses))


//courses array
if (localStorage.getItem('courses')){
  courses = JSON.parse(localStorage.getItem('courses'))
}else{
  courses=[]
}



