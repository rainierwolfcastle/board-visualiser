// export the function so we can test it.
export const fetchData = async () => {
  const response = await fetch("/data");
  const responseData = await response.json();

  // Build the data structure for D3 to render the tree

  // Add a counter so we can render how many children a node has.
  const data = { name: "root", count: 0, children: [] };

  responseData.data.boards.forEach((board) => {
    // Collected the devices for each board.
    const devices = [];
    board.devices.forEach((device) => {
      // Set count to -1 as a flag to not render a count for devices.
      devices.push({ name: device.name, count: -1, children: [] });
    });

    // Find the vendor
    const vendor = data.children.find((element) => {
      return element.name === board.vendor.name;
    });

    // If the vendor doesn't exist add it to the data structure and push the board and devices.
    if (vendor == undefined) {
      data.children.push({ name: board.vendor.name, count: 1, children:
        [{ name: board.name, count: devices.length, children: devices }]
      });
      data.count++;
    // If the vendor exists push the board and devices to the existing element.
    } else {
      vendor.children.push({
        name: board.name, count: devices.length, children: devices
      });
      vendor.count++;
    }
  });

  return data;
};
