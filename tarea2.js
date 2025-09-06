const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/reporte') {
    try {
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('Ventas');

      ws.columns = [
        { header: 'Producto', key: 'producto', width: 20 },
        { header: 'Cantidad', key: 'cantidad', width: 10 },
        { header: 'Precio',   key: 'precio',   width: 12, style: { numFmt: '"S/ "#,##0.00' } },
      ];

      const base = ['Teclado','Mouse','Monitor','Laptop','Auriculares','Parlantes','Webcam','Impresora','USB 64GB','SSD 1TB'];
      for (let i = 0; i < 20; i++) {
        const producto = `${base[i % base.length]} ${i + 1}`;
        const cantidad = Math.floor(Math.random() * 5) + 1;
        const precio = Number((Math.random() * 200 + 30).toFixed(2));
        ws.addRow({ producto, cantidad, precio });
      }
      ws.getRow(1).font = { bold: true };

      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="reporte.xlsx"',
        'Cache-Control': 'no-store',
        'Transfer-Encoding': 'chunked',
        'Connection': 'close',
      });

      await wb.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error('Error /reporte:', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }
      res.end('Error generando el Excel');
    }
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Visita /reporte para descargar el Excel');
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
