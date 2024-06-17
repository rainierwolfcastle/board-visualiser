# board-visualiser

## How to run

Run `npm start` and then load `http://127.0.0.1:8080/` in your browser.

## How to test

Run `npm install` and then `npm test`

## General Information

- I created a local server to work around CORS problems.
- I used D3 to render the tree. The code from the tree was adapted from: https://observablehq.com/@d3/collapsible-tree. I could have implemented the tree directly using D3 but it would have taken me longer and I'd use D3 in production.
- You can pan the tree by clicking and dragging.
- You can zoom the tree using two finger scrolling on a Mac trackpad.
- Each node has a count of sub nodes in its name. A device node doesn't display a count.

## Further work

- The initial rendering of the tree could be speeded up. I could change the query to reduce the size of the data loaded from the GraphQL server or only load vendors to begin with and then load the rest on-demand. I could also add some caching and pre-rendering on the server.
- Put limits on zooming and panning the tree e.g. the tree can't be hidden.
- Set the D3 viewport relative to the browser window.
- Ability to search for vendors, boards, and devices. I could use the `search_projects` fragment for that.
- Use a package manager to manage D3 rather than including the file directly.
