const input = document.getElementById("input");
let querySearch = "";
const button = document.getElementById("button");
const container = document.getElementById("container");

window.addEventListener("keypress", (e) =>{
    
    if(e.key == "Enter"){
        e.preventDefault();
        run()
    } 
})
button.addEventListener("click", (e) =>{
    e.preventDefault();
    run();
})




const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '21e2ceb624mshe9c10adb94b0269p1209afjsn38c1e0abab1b',
		'x-rapidapi-host': 'jsearch.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};
async function run(){
    querySearch = input.value.replaceAll(" ", "%20")
    let url = `https://jsearch.p.rapidapi.com/search?query=${querySearch}&page=1&num_pages=1&country=us&date_posted=all`

    try {
        if(querySearch.length == 0){
            container.innerHTML = "<h3 id='warning' class='warning'>Please fill in the textbox</h3>"
        }else{
            container.innerHTML = "<h3>Loading....</h3>"
            const response = await fetch(url, options);
            const result = await response.json();
            const data = result.data;
            container.innerHTML = "";
            console.log(data);
            data.forEach(item => {
                container.innerHTML += ` 
                <div class='job-container'>
                <h2>Title: ${item.job_title}</h2>
                <h3>Company: ${item.employer_name}</h3>
                <a href=${item.apply_options[0].apply_link}>${item.apply_options[0].apply_link}</a>
                <img src=${item.employer_logo}/>
                </div>
                `
            })
        }

        
    } catch (error) {
        console.error(error);
    }
}

