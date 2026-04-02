let selected = null; // index de l'étudiant sélectionné

// LOGIN
function login(){
  if(user.value==="admin" && pass.value==="1234"){
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    load();
  }else{
    alert("Identifiants incorrects");
  }
}

// LOGOUT
function logout(){
  location.reload();
}

// NAVIGATION
function show(page){
  document.querySelectorAll('.content > div')
    .forEach(d=>d.classList.add('hidden'));

  document.getElementById(page).classList.remove('hidden');
}

// ADD / UPDATE
function add(){
  let data = JSON.parse(localStorage.getItem("data"))||[];

  const etudiant = {
    nom: nom.value,
    prenom: prenom.value,
    sexe: sexe.value,
    dateNaissance: dateNaissance.value,
    promo: Promotion.value,
    departement: departement.value
  };

  // Validation simple : aucun champ vide
  if(!etudiant.nom || !etudiant.prenom || !etudiant.sexe || !etudiant.promo || !etudiant.departement){
    return alert("Remplis tous les champs !");
  }

  if(selected === null){
    data.push(etudiant); // ajout
  } else {
    data[selected] = etudiant; // modification
    selected = null; // reset
  }

  localStorage.setItem("data", JSON.stringify(data));
  load();
  show('list');
  clearForm();
}

// CLEAR FORM
function clearForm(){
  nom.value = "";
  prenom.value = "";
  sexe.value = "";
  Promotion.value = "";
  departement.value = "";
}

// LOAD TABLE
function load(){
  let table=document.getElementById("table");
  let total=document.getElementById("total");

  let data=JSON.parse(localStorage.getItem("data"))||[];

  table.innerHTML="";

  data.forEach((e,i)=>{
    table.innerHTML+=`
      <tr>
        <td>${e.nom}</td>
        <td>${e.prenom}</td>
        <td>${e.sexe}</td>
        <td>${e.dateNaissance}</td>
        <td>${e.promo}</td>
        <td>${e.departement}</td>
        <td>
          <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
          <button onclick="remove(${i})"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });

  total.innerText=data.length;
}

// EDIT STUDENT
function edit(i){
  let data = JSON.parse(localStorage.getItem("data"));
  nom.value = data[i].nom;
  prenom.value = data[i].prenom;
  sexe.value = data[i].sexe;
  Promotion.value = data[i].promo;
  departement.value = data[i].departement;
  selected = i;
  show('form');
}

// DELETE STUDENT
function remove(i){
  let data = JSON.parse(localStorage.getItem("data"));
  data.splice(i,1);
  localStorage.setItem("data", JSON.stringify(data));
  load();
}