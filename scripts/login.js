// for login page
let login_button = document.getElementById("login_button");
let sign_up_button = document.getElementById("sign_up_button");

let login_page = document.getElementById("login_page")
let signup_page = document.getElementById("signup_page")

signup_page.style.display = "none";

sign_up_button.addEventListener("click", function () {
  login_page.style.display = "none";
  signup_page.style.display = "block";
})


//  for otp input
let otp = document.getElementById("otp_input");
otp.style.display = "none"
let your_otp = document.getElementById("your_otp")
your_otp.style.display = "none"
let otp_display = document.getElementById("otp_display");
otp_display.style.display = "none"
let  number_input = document.getElementById("number_input").value;


let bag = []
let scope = []
var display_name=[]
let continue_button = document.getElementById("continue_button");
continue_button.addEventListener("click", function () {
let flag=true;
let data_inside_input="something"
  fetch("http://localhost:3000/users")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
     
    
      data.forEach((ele)=>{
        let  number_input = document.getElementById("number_input").value;
     
        if(number_input===ele.number){
          flag=false;
           display_name=ele.name;
        }else if(number_input.length=="0"){
          flag="nothing"
        }
        
      })
       if(flag==false){
        otp.style.display = "block"

        let b = generateOTP()
        console.log(b)
        scope = b
      
        setTimeout(() => {
          your_otp.style.display = "block";
          otp_display.style.display = "block";
          otp_display.innerText = b;
        }, 3000)
        continue_button.style.display = "none"
        new_continue.style.backgroundColor = "#008CFF"
      }else if(flag=="nothing"){
       alert("Please fill something")
      }else{
        alert("This number is not Registered")
      }

    }) 
})

let new_continue = document.getElementById("new_continue")
new_continue.addEventListener('click', function () {
 
  let otp_inputs = document.getElementById("otp_input").value;
  if (otp_inputs === scope) {
    alert("Login Succesfull")
    localStorage.setItem("name","login_succesfull")
    window.location.assign("index.html")
    // localStorage.setItem("name",display_name)
  
  }else if(otp_inputs==""){
   alert ("Please fill otp")
  }else if( number_input==""){
    alert("Please fill your number")
  } else{
    alert('Please fill correct otp')
  }
  
})



function change() {
  let input_value = document.getElementById("number_input").value;
  if (input_value.length == 9) {
    let continue_button = document.getElementById("continue_button");
    continue_button.style.backgroundColor = "#008CFF"
  }
}

//  for otp input
// let otp=document.getElementById("otp_input");
// otp.style.display="none"
// let conbtn=document.getElementById("continue_button");
// conbtn.addEventListener("click",function(){
//   otp.style.display="block"
//   let a=generateOTP()
//   console.log(a)
// })

// for otp genrate
function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


// for signup page

let login_buttons = document.getElementById("login_buttons");
let sign_up_buttons = document.getElementById("sign_up_buttons");

login_buttons.addEventListener("click", function () {
  login_page.style.display = "block";
  signup_page.style.display = "none";
})


let registerForm = document.getElementById("input_or_countinue_div");
registerForm.addEventListener("submit", function (event) {
  event.preventDefault()

  // console.log("hy")

  let inputMobile = registerForm.numbers_input.value;
  let flag = true;
  fetch("http://localhost:3000/users")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      data.forEach((el, index) => {
        console.log(el)
        if (el.number == inputMobile) {
          flag = false
          return
        }
      })
       console.log(flag)
        if (flag == true) {
        let names = document.getElementById("named_input")
        let emails = document.getElementById("email_input")
        let passwords = document.getElementById("password_input")

        console.log(names, emails, inputMobile, passwords)
        if (names.value.length < 3) {
          cre_one.style.display = "block"
          return
        }
      else if (inputMobile.length < 10 || inputMobile.length > 10) {
          cre_two.style.display = "block"
          return
        }
       else if (passwords.value.length < 4) {
          cre_three.style.display = "block"
          return
        }


        let users = {
          name: names.value,
          email: emails.value,
          number: inputMobile,
          password: passwords.value,
        }

        fetch("http://localhost:3000/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(users)
        })
        alert("Registered Succesfully")

      }
      else {
        alert("This number is already registered")
      }
    })
})


// for required length

let cre_one = document.getElementById("cre_one");
cre_one.style.display = "none"
let cre_two = document.getElementById("cre_two");
cre_two.style.display = "none"
let cre_three = document.getElementById("cre_three");
cre_three.style.display = "none"


function forname() {
  let frist = document.getElementById("named_input").value
  if (frist.length > 1) {
    let cre_one = document.getElementById("cre_one")
    cre_one.style.display = "none"
  }
}

function fornumber() {
  let second = document.getElementById("numbers_input").value
  if (second.length > 8) {
    let cre_two = document.getElementById("cre_two")
    cre_two.style.display = "none"
  }
}


// function forpassword(){
//   let third=document.getElementById("password_input").value
//   if(third.length>9){
//     let cre_three=document.getElementById("cre_three")
//     cre_three.style.display="none"
//   }
// }
//  for continue btn background color
function key() {
  let passwords = document.getElementById("password_input").value
  if (passwords.length == 0) {
    let btn = document.getElementById("continue_buttons");
    btn.style.backgroundImage = "linear-gradient(93deg,#f0772c,#f95776)"
  }
  if (passwords.length > 2) {
    let cre_three = document.getElementById("cre_three")
    cre_three.style.display = "none"
  }
}