<template>
    <footer> 
        <section class="logo"> 
            <img alt="Vue logo" src="../assets/Groupomania_logo_red.png">
        </section>
        <section class="infos">
            <h4> Partenaires </h4>
                <ul class="liens"> 
                    <li> <a href="https://openclassrooms.com/fr"> OpenClassrooms </a> </li>
                    <li> <a href="https://developer.mozilla.org/fr/"> Developer Mozilla </a> </li>
                    <li> <a href="https://vuejs.org/"> Vue.Js </a> </li>
                </ul>
        </section>
        <section class="infos2"> 
            <h4> Contacts </h4>
                <ul class="liens"> 
                    <li> <a href="mailto: adrien_Weiss@outlook.fr"> Messagerie</a></li>
                    <li> +33 1 80 88 80 30 </li>
                    <li> <a href="https://openclassrooms.com/forum/"> FAQ </a> </li>
                </ul>
        </section>
        
    </footer>


</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang="scss">

footer {
    display: flex;
    height: 160px;
    background-color: blue;
    color: rgb(252, 245, 245);
    font-size: 0.7em;
    width: 100%;
    margin: auto;

    .logo {
        width:20%;
    }

    img {
              
        width: 100%;
        height:160px; 
        opacity: 0.6;
        background-color: blue;
    }

    .infos, .infos2 {
        display:flex;
        width: 40%;
        flex-direction: column;    
        margin: auto;
        padding: 10px; 
    }

    h4 {  
        padding-left: 0; 
        text-align: left;
        color: rgb(250, 8, 8);
        font-weight: bold;
        font-size: 1.2em;
        
    }

      li { 
        margin-bottom: 10px; 
        list-style: none;      
    }

    a {
        text-decoration: none;
        color: rgb(255, 255, 255)
    }
    
    ul {
        text-align: left;
        padding: 0;
    }
}

</style>