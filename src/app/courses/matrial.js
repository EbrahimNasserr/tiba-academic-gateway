
 const courses = [
  {
    id: 1,
    title: "HTML",
    description:
      "Basics of web development and the road map of knowing everything about HTML.",
    instructor: "ELzero Web school",
    instructorAvatar:
      "https://yt3.googleusercontent.com/BfSdc0xKk9Gx5ge5cHQm9uzNV4zyJ7RCWSmnoMwbIvAE3xqdYWQV_b_TGVQTQUjGVcSJr_XHraw=s160-c-k-c0x00ffffff-no-rj",
    lectures: 37,
    thumbnail:
      "https://img.youtube.com/vi/6QAELgirvjs/mqdefault.jpg",
    rating: 4.9,
    category: "Web Development",
    date: "2021",
    featured: true,
    isNew: false,
    link:'https://www.youtube.com/watch?v=6QAELgirvjs&list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji'
  },
  {
    id: 2,
    title: "CSS",
    description:
      "learning of web development and  everything about CSS.",
    instructor: "ELzero Web school",
    instructorAvatar:
      "https://yt3.googleusercontent.com/BfSdc0xKk9Gx5ge5cHQm9uzNV4zyJ7RCWSmnoMwbIvAE3xqdYWQV_b_TGVQTQUjGVcSJr_XHraw=s160-c-k-c0x00ffffff-no-rj",
    lectures: 88,
    thumbnail:
      "https://img.youtube.com/vi/X1ulCwyhCVM/mqdefault.jpg",
    rating: 4.8,
    category: "Web Development",
    date: "2021",
    featured: true,
    isNew: false,
    link:'https://www.youtube.com/watch?v=X1ulCwyhCVM&list=PLDoPjvoNmBAzjsz06gkzlSrlev53MGIKe&index=1&pp=iAQB'
  },
  {
    id: 3,
    title: "JavaScript",
    description:
      "learning of web development and  everything about CSS.",
    instructor: "ELzero Web school",
    instructorAvatar:
      "https://yt3.googleusercontent.com/BfSdc0xKk9Gx5ge5cHQm9uzNV4zyJ7RCWSmnoMwbIvAE3xqdYWQV_b_TGVQTQUjGVcSJr_XHraw=s160-c-k-c0x00ffffff-no-rj",
    lectures: 188,
    thumbnail:
      "https://img.youtube.com/vi/eKuNnpWhm7c/mqdefault.jpg",
    rating: 4.7,
    category: "Web Development",
    date: "2021",
    featured: true,
    isNew: false,
    link:'https://www.youtube.com/watch?v=GM6dQBmc-Xg&list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv'
  },
  {
    id: 4,
    title: "C++",
    description:
      "Fundamentals Of Programming With C++.",
    instructor: "ELzero Web school",
    instructorAvatar:
      "https://yt3.googleusercontent.com/BfSdc0xKk9Gx5ge5cHQm9uzNV4zyJ7RCWSmnoMwbIvAE3xqdYWQV_b_TGVQTQUjGVcSJr_XHraw=s160-c-k-c0x00ffffff-no-rj",
    lectures: 78,
    thumbnail:
      "https://img.youtube.com/vi/XDuWyYxksXU/mqdefault.jpg",
    rating: 4.5,
    category: "Web Development",
    date: "2023",
    featured: false,
    isNew: false,
    link:'https://www.youtube.com/watch?v=XDuWyYxksXU&list=PLDoPjvoNmBAwy-rS6WKudwVeb_x63EzgS&index=1'
  },
  {
    id: 5,
    title: "Python",
    description:
      "Fundamentals Of AI Programming With Python.",
    instructor: "ELzero Web school",
    instructorAvatar:
      "https://yt3.googleusercontent.com/BfSdc0xKk9Gx5ge5cHQm9uzNV4zyJ7RCWSmnoMwbIvAE3xqdYWQV_b_TGVQTQUjGVcSJr_XHraw=s160-c-k-c0x00ffffff-no-rj",
    lectures: 152,
    thumbnail:
      "https://img.youtube.com/vi/mvZHDpCHphk/mqdefault.jpg",
    rating: 4.1,
    category: "AI",
    date: "2020",
    featured: false,
    isNew: false,
    link:'https://www.youtube.com/watch?v=mvZHDpCHphk&list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs'
  },
  {
    id: 6,
    title: "JAVA",
    description:
      "learning Data Structures using Java ",
    instructor: "Mohamed El Desouki",
    instructorAvatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_ku9zBi6Y8-rZaRo3udRMt8zSvLrL_JAED1mz2S9ELaOA=s160-c-k-c0x00ffffff-no-rj",
    lectures: 5,
    thumbnail:
      "https://img.youtube.com/vi/_b1wo2QKqGw/mqdefault.jpg",
    rating: 4.2,
    category: "Data Structures",
    date: "2025",
    featured: false,
    isNew: true,
    link:'https://www.youtube.com/watch?v=_b1wo2QKqGw&list=PL1DUmTEdeA6K2yGIRxMvK9nTfRIiWXAWV'
  },
  {
    id: 7,
    title: "Calculus ",
    description:
      "learn Calculas with arabic ",
    instructor: "Dr. Ahmed Hagag",
    instructorAvatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_lVcI5edRkyKHYQNFPR9aIO47II5zw-nYdXABfmVozXXA=s160-c-k-c0x00ffffff-no-rj",
    lectures: 34,
    thumbnail:
      "https://img.youtube.com/vi/pUAaasolcVk/mqdefault.jpg",
    rating: 3.2,
    category: "Mathmatics",
    date: "2021",
    featured: true,
    isNew: false,
    link:'https://www.youtube.com/watch?v=pUAaasolcVk&list=PLxIvc-MGOs6hMiR2Xis-mJ1sXNwWsZ1Bh'
  },
  {
    id: 8,
    title: "Matrices",
    description:
      "learn all about Matrix  with arabic ",
    instructor: "Amsheer WaBasheer",
    instructorAvatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_lDPxcPcNWtwgLoeYiPrPrFeUl2RaVysBuZqj90vXU1Yg=s160-c-k-c0x00ffffff-no-rj",
    lectures: 14,
    thumbnail:
      "https://img.youtube.com/vi/KI7oe0bwHnY/mqdefault.jpg",
    rating: 2.2,
    category: "Mathmatics",
    date: "2016",
    featured: false,
    isNew: false,
    link:'https://www.youtube.com/watch?v=KI7oe0bwHnY&list=PLy-0y1RosLEe5xfGlG-xklUQincKiBbTP'
  },
  
];

export default courses;