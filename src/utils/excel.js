// xcel texport utils
import XLSX from 'xlsx';

export const prepareExcelFromData = (data) => {
    const wb = { SheetNames: [], Sheets: {} }

    wb.Props = {
        Title: 'achieve mpls Tickets',
        Author: 'achieve mpls',
        CreatedDate: new Date(),
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const ws_name = 'Tickets'
    XLSX.utils.book_append_sheet(wb, ws, ws_name)

    const wbOut = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    return wbOut;
}

// I wish i knew some of the logic behind this.  but it works!
export const dataToBuffer = (stream) => {
    const buffer = new ArrayBuffer(stream.length);
    let view = new Uint8Array(buffer);
    for (let i = 0; i<stream.length; i++) {
        view[i] = stream.charCodeAt(i) & 0xFF;
    }
    return buffer;
}