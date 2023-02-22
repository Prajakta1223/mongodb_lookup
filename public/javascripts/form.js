getUser()
//Add the User
$("#btn").on("click",function(){
$("#form").validate({
  rules:{
    name:"required",
    email:"required",
    number:"required",
    selectedStatus:"required",
    selectedUser:"required",
  } ,
  messages:{
    name:"Please Enter a Valid Name",
    email:"Please Enter a Valid Email",
    MobileNo:"Please Enter a Valid Mobile Number",
    Status:"Please Enter a valid Status",
    user:"Please Enter a Valid User",
  }, 
  submitHandler:function()
 {
     const eventType = $("#btn").attr('data-type')
     if(eventType === 'update'){
      Update_data()
     }else{
      addUserData()
     }
 }
})
});
function addUserData()
{
       let obj=new Object();
       obj.name=document.getElementById('name').value;
       obj.email=document.getElementById('email').value;
       obj.mobile_number=document.getElementById('number').value;
       obj.Status=document.getElementById('selected-status').value;
       obj.user_type=document.getElementById('selected-user').value;
      console.log(obj);
      
       axios({
        method:"post",
        url:'http://localhost:3000/users/addUser',
        data:obj,
      })
      .then(function(response){
        console.log(response.data);
        getUser();
      })
      .catch(function(err){
          console.log(err);
      })

      document.getElementById("form").reset();

  
}
//for get the users Data
function getUser()
{
  axios.get('http://localhost:3000/users/display')
  .then(function(response){
    console.log(response);
    $html='';
    let count=0;
    response.data.forEach(function(data,count){
      $id=data._id;
      console.log($id); //get the id
      
      //console.log(data);
      $html+='<tr>';
      $html+='<td id="no">'+(count+1)+'</td>';
      $html+='<td id="username">'+data.name+'</td>';
      $html+='<td id="email">'+data.email+'</td>';
      $html+='<td id="number">'+data.mobile_number+'</td>';
      $html+='<td id="Status">'+data.Status+'</td>';
      $html+='<td id="user_type">'+data.user_type+'</td>';
      // $html+='<td>`<a href="javascript:void(0)" <button id="item-delete" onclick="return Delete(this) " >delete</button></a> |  <button id="item-edit" onclick=" return Edit(this) data-id='+data._id+'">Edit</button> </td>';
      $html +=
          '<td> <a href="javascript:void(0)" <button class="btn1" id = "ShowButton" onclick="return Edit(this)"  data-id= ' +data._id +
          ' >Edit</button></a> | <button class="btn1" onclick="return Delete(this)"  data-id = ' +
          data._id +
          ">Delete</button>` </td>";
      $html+='</tr>';
    }) 
    document.getElementById('tbody').innerHTML=$html
  })
  .catch(function(error){
    console.log(error);
  })
}

//Edit the user
function Edit(th)
{
    alert('You are really Want to Update...!');
    var id=th.getAttribute('data-id');
        console.log("id from the Edit function"+id);
    document.getElementById('btn').innerHTML='UPDATE';
    axios({
      method:"get",
      url:'http://localhost:3000/users/oneUserRecord/'+id,

    })
    .then(function(response){
      console.log(response.data.Status);
      console.log('*******'+response.data._id);

       document.getElementById('name').value=response.data.name;
       document.getElementById('email').value=response.data.email;
       document.getElementById('number').value=response.data.mobile_number;
       document.getElementById('selected-status').value=response.data.Status;
       document.getElementById('selected-user').value=response.data.user_type;
       document.getElementById('save-id').value=response.data._id;

       $("#btn").attr({"data-type" : "update", "data-id" : response.data._id}).text("Update")
    })
    .catch(function(err){
        console.log(err);
    })
    
  }


   //Update the User
  function Update_data()
  {
    let obj=new Object();
    obj.name=document.getElementById('name').value;
    obj.email=document.getElementById('email').value;
    obj.mobile_number=document.getElementById('number').value;
    obj.Status=document.getElementById('selected-status').value;
    obj.user_type=document.getElementById('selected-user').value;
     console.log(obj);

     axios({
      method:"patch",
      url:'http://localhost:3000/users/update/' + $("#btn").attr('data-id'),
      data:obj,
    })
    .then(function(response){
      getUser();
      console.log(response.data);
      alert("User Updated Successfully....!");
    })
    .catch(function(err){
        console.log(err);
    })

    document.getElementById("form").reset()
  }
  
   //Delete the record
   function Delete(th)
   {
      alert("Are you want to delete User Record..!");
      var id=th.getAttribute('data-id');
      document.getElementById('save-id').value=id;

      axios({
        method:"delete",
        url:'http://localhost:3000/users/delete/'+document.getElementById("save-id").value,
        
      })
      .then(function(response){
        getUser();
      })
      .catch(function(err){
          console.log(err);
      })
      location.reload();

   }

/*
add botton edit and delete are error so solve it
perform operation on edit update and delete
*/