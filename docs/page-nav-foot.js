async function fetchAndLogPage() {
    const url = "https://sheets.googleapis.com/v4/spreadsheets/1RamZbmilTQZePFSq3OruCsjW2sf3KilOg05JdWZjfm0/values/Sheet1?alt=json&key=AIzaSyD02By87q_dkNk6VPNSOPBpDhPQJJOqSmk";
    let page; // Declare 'page' in the outer scope
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        page = json.values[0][0]; // Assign value to 'page'
        console.log(json)
        return page;
      } catch (error) {
        console.error('Error with fetch operation:', error.message);
      }
    }
    return await fetchData();
     
  }

async function handleLinkClick(event, link) {
  event.preventDefault();
  const page1 = await fetchAndLogPage(); // Await the result of fetchAndLogPage
  const href = link.getAttribute('href');
  const sixthCharFromBack = parseInt(href[href.length - 6]) || 0;
  const page = parseInt(page1);
  if (sixthCharFromBack <= page) {
    window.location.href = href;
  } else {
    alert('Please wait for the instructor to finish the current page before progressing to the next page');
  }
}
  
document.querySelectorAll('.sidebar-link, .pagination-link').forEach(link => {
  link.addEventListener('click', function(event) {
    handleLinkClick(event, link);
  });
});