// // pages/api/books/index.js
// export default function handler(req, res) {
//     // Mock book data
//     const books = [
//       {
//         id: 1,
//         title: 'Moby Dick',
//         description: 'A tale of a whale and revenge.',
//         // Add additional book details here
//       },
//       // ...more books
//     ];

//     // Check the HTTP method
//     if (req.method === 'GET') {
//       // Return the list of books
//       res.status(200).json(books);
//     } else {
//       // Handle any other HTTP method
//       res.setHeader('Allow', ['GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }
