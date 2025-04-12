import BookCard from "./BookCard";

export default function Books() {
  const books = [
    {
      id: 1,
      title: "Calculus Made Simple",
      author: "Dr. Robert Smith",
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Introduction to Biology",
      author: "Prof. Jane Wilson",
      cover:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "Modern Chemistry",
      author: "Dr. David Lee",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    },
    {
      id: 4,
      title: "English Literature",
      author: "Prof. Mary Adams",
      cover:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=2487&ixlib=rb-4.0.3",
    },
  ];
  return (
    <section className="py-16 ">
      <div className="custom-container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">
          Academic Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
