document.addEventListener("DOMContentLoaded", () => {
    const entries = document.getElementById("entries");
    const error = document.getElementById("error");

    const createBlogEntry = (id, title) => {
        // creates a list item containing the title of the blog 
        // and a button that has a click handler attached that sends a 
        // delete request to "/blog" and deletes the blog from the database 
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerText = title;
        li.appendChild(p);
    
        const button = document.createElement("button");
        button.innerText = "delete";
        button.style.marginLeft = "5px"
        button.addEventListener("click", () => deleteEntry(id));
        p.appendChild(button);
    
        return li
    }

    const getBlogs = async () => {
        // gets all blogs from the database creates a new entry for each and appends it to the list 
        try {
            const res = await fetch("/blogs")
            const data = await res.json();
            console.log(data);
            for (let entry of data.entries) {
                entries.appendChild(createBlogEntry(entry.id, entry.title));
            }
            const nextId = document.getElementById("id");
            nextId.value = data.entries.length + 1;
        } catch (err) {
            console.log(err);
        }
    }

    // get all blogs on load and display them 
    getBlogs();

    const deleteEntry = async (id) => {
        // sends a delete request to the server deleting the blog with the correct id 
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const body = JSON.stringify({ id });
        const request = new Request("/blog", { method: "DELETE", body, headers });
        
        try {
            const res = await fetch(request);
            const data = await res.json();
            if (data.status == "success") {
                window.location.reload();
            } else {
                error.innerText = "there was an error deleting that blog!"
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    
});