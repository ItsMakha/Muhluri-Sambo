from django.shortcuts import render, get_object_or_404

# Book data (in a real app, this would come from a database)
BOOKS = [
    {
        'id': 1,
        'title': 'Infinite Teen',
        'author': 'Muhluri Sambo',
        'price': 'R250',
        'genre': 'Young Adult / Self-Development',
        'rating': 4.8,
        'description': 'A transformative guide for teenagers navigating the complexities of modern life. Live beyond the boundaries and discover your infinite potential.',
        'long_description': 'Infinite Teen is more than just a book—it\'s a movement. Muhluri Sambo delivers a powerful message to teenagers across Africa and beyond, encouraging them to break free from limiting beliefs and societal expectations. Through personal anecdotes, practical exercises, and profound insights, this book challenges young people to envision a future without boundaries and take actionable steps toward their dreams.',
        'publisher': 'Infinite Publishing',
        'publication_date': '2022',
        'isbn': '978-0-9876543-1-5',
        'pages': '210',
        'language': 'English',
        'format': 'Paperback / E-book',
        'image': 'muhluri_portfolio/img/Image 13.jpeg',  # Note the capital I and space
        'series': 'Infinite Series'
    },
    {
        'id': 2,
        'title': 'Rethinking Black Consciousness',
        'author': 'Muhluri Sambo',
        'price': 'R280',
        'genre': 'Political Thought',
        'rating': 4.7,
        'description': 'A new perspective on identity, consciousness, and liberation in post-apartheid South Africa.',
        'long_description': 'In this groundbreaking work, Muhluri Sambo reexamines the philosophy of Black Consciousness through a contemporary lens. Drawing from his studies in Political Science and Development Studies, as well as his experiences as a young activist, Sambo offers fresh insights into what Black Consciousness means for a new generation of South Africans.',
        'publisher': 'Infinite Publishing',
        'publication_date': '2023',
        'isbn': '978-0-9876543-2-2',
        'pages': '185',
        'language': 'English',
        'format': 'Paperback',
        'image': 'muhluri_portfolio/img/Image 12.jpeg',  # Note the capital I and space
        'series': 'Political Thought'
    },
    {
        'id': 3,
        'title': 'Infinite Life: Young Single and Free',
        'author': 'Muhluri Sambo',
        'price': 'R230',
        'genre': 'Personal Development',
        'rating': 4.6,
        'description': 'Embrace your journey of self-discovery and personal growth as a young person navigating life.',
        'long_description': 'Young, single, and free—three words that can either feel liberating or terrifying. Muhluri Sambo guides readers through the journey of self-discovery during the formative years of early adulthood. With wisdom beyond his years, Sambo addresses the challenges of identity, purpose, relationships, and independence.',
        'publisher': 'Infinite Publishing',
        'publication_date': '2023',
        'isbn': '978-0-9876543-3-9',
        'pages': '195',
        'language': 'English',
        'format': 'Paperback / E-book',
        'image': 'muhluri_portfolio/img/Image 09.jpeg',  # Note the capital I and space
        'series': 'Infinite Series'
    },
    {
        'id': 4,
        'title': 'Infinite Life: Nothing Changes Until You Change',
        'author': 'Muhluri Sambo',
        'price': 'R240',
        'genre': 'Transformational Guide',
        'rating': 4.9,
        'description': 'The power of transformation begins within. Discover how personal change creates external results.',
        'long_description': 'This is the core message of Muhluri Sambo\'s philosophy: transformation must begin internally before it manifests externally. In this powerful guide, Sambo challenges readers to take radical responsibility for their lives and make the internal shifts necessary for external success.',
        'publisher': 'Infinite Publishing',
        'publication_date': '2024',
        'isbn': '978-0-9876543-4-6',
        'pages': '220',
        'language': 'English',
        'format': 'Hardcover',
        'image': 'muhluri_portfolio/img/Image 11.jpeg',  # Note the capital I and space
        'series': 'Infinite Series'
    },
    {
        'id': 5,
        'title': 'Infinite Elevation',
        'author': 'Muhluri Sambo',
        'price': 'R260',
        'genre': 'Success & Achievement',
        'rating': 4.8,
        'description': 'Reach your highest potential through intentional living and purposeful action.',
        'long_description': 'Infinite Elevation is the culmination of Muhluri Sambo\'s teachings on success, leadership, and personal mastery. This book provides a roadmap for those who refuse to settle for mediocrity and are committed to reaching their highest potential in every area of life.',
        'publisher': 'Infinite Publishing',
        'publication_date': '2024',
        'isbn': '978-0-9876543-5-3',
        'pages': '235',
        'language': 'English',
        'format': 'Hardcover',
        'image': 'muhluri_portfolio/img/Image 10.jpeg',  # Note the capital I and space
        'series': 'Infinite Series'
    }
]

def home(request):
    return render(request, 'muhluri_portfolio/index.html')

def book_detail(request, book_id):
    # Find the book by ID
    book = next((book for book in BOOKS if book['id'] == book_id), None)
    
    if book:
        return render(request, 'muhluri_portfolio/book.html', {'book': book})
    else:
        # Book not found
        return render(request, 'muhluri_portfolio/book_not_found.html', {'book_id': book_id})