"use strict";

let globalData = null;

// JavaScript om JSON-data op te halen
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fout: ${error}`);
        return null;
    }
}

async function getData(fetchFunction){
    const jsonData = await fetchFunction();
    return jsonData;
}

getData(fetchData).then(
    data => {
        const myData = data;
        myData.forEach(post => {
            console.log(post);
        });
        console.clear();
        }
      
)

const body = document.querySelector('body');
body.style.backgroundColor = 'black';



getData(fetchData).then(
    data => {
        const myData = data;
        const filterData = myData.filter(
            filter => {
                return filter.userId === 1;
            }
        )
        console.log(filterData); 
        console.clear();
        }
    
)


getData(fetchData).then(
    data => {
        const myData = data;
        const filterData = myData.filter(
            filter => {
                return filter.userId === 2;
            }
        )

        const mappedData = filterData.map(
            post => {
                return post.id * 10;
            }
        )
        console.log(mappedData); 
        const reducedPosts = mappedData.reduce(
            (sum, post) => {
                return sum + post
            }
        )
        console.log(reducedPosts);
        }
    
)