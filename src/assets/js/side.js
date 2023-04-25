  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  sidebarToggle.addEventListener("click", function() {
    if (sidebar.style.left === "-350px") {
      sidebar.style.left = "0";
    } else {
      sidebar.style.left = "-350px";
    }
     
    
  });

