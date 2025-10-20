   // 动态加载资源数据
   fetch("./resources.json")
   .then((response) => response.json())
   .then((data) => {
     createResource(data);
     //加载线上资源
     fetch("https://www.api.kuake98.com/resourceList")
       .then((response) => response.json())
       .then((onlineData) => {
         console.log(onlineData, "onlineData");
         onlineData = onlineData.map((item) => {
           let downloadURL = JSON.parse(item.urls)[0] || "#";
           return {
             ...item,
             downloadURL,
             name: item.title || "未知资源",
           };
         });
         createResource(onlineData);
         updateResource(onlineData);
       })
       .catch((error) =>
         console.error("Error loading online resources:", error)
       );
   })
   .catch((error) => console.error("Error loading resources:", error));

 function createResource(data) {
   const container = document.getElementById("software-share-container");
   container.innerHTML = ""; // 清空所有子元素
   const categories = {};

   // 按分类分组资源
   data.forEach((item) => {
     if (!categories[item.classify]) {
       categories[item.classify] = [];
     }
     categories[item.classify].push(item);
   });

   // 动态生成分类模块
   Object.keys(categories).forEach((category) => {
     const categoryHeader = document.createElement("div");
     categoryHeader.className = "software-box-header";
     categoryHeader.innerHTML = `<h3>${category}分享</h3>`;

     const categoryBox = document.createElement("div");
     categoryBox.className = "software-box";

     categories[category].forEach((resource) => {
       const link = document.createElement("a");
       link.href = resource.downloadURL;
       link.className = "download-btn-more";
       link.setAttribute("aria-label", resource.description);
       link.textContent = resource.name;
       categoryBox.appendChild(link);
     });
     categoryHeader.appendChild(categoryBox);
     container.appendChild(categoryHeader);
   });
 }
 function updateResource(data) {
   const link = document.getElementById("download-btn");
   const href = link.getAttribute("href"); // 获取 href 属性的值
   const id = href?.split("/").pop();
   console.log(href, "href", "id", id);
   const target = data.filter((item) => item.id == id)[0];
   if (target && target.urls && target.urls.length > 0) {
     const downloadBtns = document.getElementById("download-btns");
     downloadBtns.innerHTML = ""; // 清空所有子元素
     const urls = JSON.parse(target.urls);
     urls.forEach((item, i) => {
       const a = document.createElement("a");
       a.href = item;
       a.className = "download-btn";
       a.setAttribute("aria-label", target.name);
       a.textContent = `下载${i + 1}`;
       downloadBtns.appendChild(a);
     });
     const a = document.createElement("a");
     a.href = "https://www.kuake98.com/";
     a.className = "download-btn";
     a.setAttribute("aria-label", "查看更多资源");
     a.textContent = "更多资源";
     downloadBtns.appendChild(a);

     //------------------------------------

     const downloadBtns1 = document.getElementById("download-btns1");
     downloadBtns1.innerHTML = ""; // 清空所有子元素
     const urls1 = JSON.parse(target.urls);
     urls1.forEach((item, i) => {
       const a = document.createElement("a");
       a.href = item;
       a.className = "download-btn";
       a.setAttribute("aria-label", target.name);
       a.textContent = `下载${i + 1}`;
       downloadBtns1.appendChild(a);
     });
     const a1 = document.createElement("a");
     a1.href = "https://www.kuake98.com/";
     a1.className = "download-btn";
     a1.setAttribute("aria-label", "查看更多资源");
     a1.textContent = "更多资源";
     downloadBtns1.appendChild(a1);
   }
 }