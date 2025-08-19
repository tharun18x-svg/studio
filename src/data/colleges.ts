import type { College } from "@/lib/types";

export const colleges: College[] = [
  {
    id: 1,
    code: 1,
    name: "Anna University, CEG Campus",
    ranking: 1,
    highestPackage: 55,
    description: "The College of Engineering, Guindy (CEG) is a public engineering college in Guindy, Chennai, India and is Asia's oldest technical institution, founded in 1794.",
    image: 'https://www.annauniv.edu/images/ceg.png',
    courses: [
        { id: 101, name: "Computer Science Engineering", cutoffs: { OC: 200, MBC: 199.5, BC: 199.75, BCM: 199, SC: 198 } },
        { id: 102, name: "Electronics and Communication", cutoffs: { OC: 199.5, MBC: 199, BC: 199.25, BCM: 198.5, SC: 197 } },
        { id: 103, name: "Mechanical Engineering", cutoffs: { OC: 198, MBC: 197, BC: 197.5, BCM: 196, SC: 194 } },
    ]
  },
  {
    id: 2,
    code: 4,
    name: "Anna University, MIT Campus",
    ranking: 2,
    highestPackage: 52,
    description: "The Madras Institute of Technology (MIT) is an engineering institute located in Chromepet, Chennai, India. It is one of the four autonomous constituent colleges of Anna University.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 201, name: "Aeronautical Engineering", cutoffs: { OC: 199, MBC: 198, BC: 198.5, BCM: 197.5, SC: 195 } },
        { id: 202, name: "Information Technology", cutoffs: { OC: 199.75, MBC: 199.25, BC: 199.5, BCM: 199, SC: 197.5 } },
        { id: 203, name: "Production Technology", cutoffs: { OC: 197, MBC: 196, BC: 196.5, BCM: 195, SC: 192 } },
    ]
  },
  {
    id: 3,
    code: 2006,
    name: "PSG College of Technology",
    ranking: 3,
    highestPackage: 50,
    description: "An autonomous, government-aided, private engineering college in Coimbatore, India. It is affiliated with Anna University.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 301, name: "Computer Science Engineering", cutoffs: { OC: 199, MBC: 198, BC: 198.5, BCM: 197.5, SC: 195 } },
        { id: 302, name: "Information Technology", cutoffs: { OC: 198.5, MBC: 197.5, BC: 198, BCM: 197, SC: 194 } },
        { id: 303, name: "Fashion Technology", cutoffs: { OC: 196, MBC: 194, BC: 195, BCM: 193, SC: 188 } },
    ]
  },
    {
    id: 5,
    code: 2377,
    name: "PSG Institute of Technology and Applied Research",
    ranking: 5,
    highestPackage: 40,
    description: "PSG iTech, the latest initiative of PSG and Sons' Charities, aims to realize the vision of its founder Thiru. G.R. Govindarajulu.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 501, name: "Computer Science Engineering", cutoffs: { OC: 198, MBC: 197, BC: 197.5, BCM: 196, SC: 192 } },
        { id: 502, name: "Electronics and Communication", cutoffs: { OC: 197, MBC: 196, BC: 196.5, BCM: 195, SC: 190 } },
        { id: 503, name: "Mechanical Engineering", cutoffs: { OC: 195, MBC: 193, BC: 194, BCM: 192, SC: 185 } },
    ]
  },
  {
    id: 4,
    code: 5008,
    name: "Thiagarajar College of Engineering",
    ranking: 4,
    highestPackage: 44,
    description: "A government-aided autonomous institution located in Madurai, Tamil Nadu, India. It is affiliated to Anna University, Chennai.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 401, name: "Computer Science Engineering", cutoffs: { OC: 198.5, MBC: 197.5, BC: 198, BCM: 197, SC: 193 } },
        { id: 402, name: "Information Technology", cutoffs: { OC: 198, MBC: 196.5, BC: 197, BCM: 196, SC: 191 } },
        { id: 403, name: "Civil Engineering", cutoffs: { OC: 196, MBC: 194, BC: 195, BCM: 193, SC: 186 } },
    ]
  },
  {
    id: 6,
    code: 2718,
    name: "Sri Krishna College of Engineering and Technology",
    ranking: 6,
    highestPackage: 42,
    description: "An autonomous institution in Coimbatore, Tamil Nadu, India. The college is affiliated with Anna University and accredited by NAAC with 'A' grade.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 601, name: "Computer Science Engineering", cutoffs: { OC: 197.5, MBC: 196, BC: 197, BCM: 195, SC: 189 } },
        { id: 602, name: "Artificial Intelligence and Data Science", cutoffs: { OC: 197, MBC: 195.5, BC: 196.5, BCM: 194, SC: 188 } },
        { id: 603, name: "Electrical and Electronics Engineering", cutoffs: { OC: 196, MBC: 194, BC: 195, BCM: 193, SC: 184 } },
    ]
  },
  {
    id: 7,
    code: 2712,
    name: "Kumaraguru College of Technology",
    ranking: 7,
    highestPackage: 38,
    description: "An engineering college in Coimbatore, started in 1984 under the auspices of Ramanandha Adigalar Foundation, a charitable educational trust of Sakthi Group.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 701, name: "Computer Science Engineering", cutoffs: { OC: 197, MBC: 195, BC: 196, BCM: 194, SC: 187 } },
        { id: 702, name: "Mechatronics Engineering", cutoffs: { OC: 195, MBC: 193, BC: 194, BCM: 192, SC: 183 } },
        { id: 703, name: "Biotechnology", cutoffs: { OC: 194, MBC: 192, BC: 193, BCM: 191, SC: 182 } },
    ]
  },
  {
    id: 8,
    code: 2007,
    name: "Coimbatore Institute of Technology",
    ranking: 8,
    highestPackage: 36,
    description: "A government-aided autonomous engineering college located in Coimbatore, Tamil Nadu, India. It was founded in the year 1956.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 801, name: "Computer Science Engineering", cutoffs: { OC: 196, MBC: 194.5, BC: 195.5, BCM: 193.5, SC: 185 } },
        { id: 802, name: "Chemical Engineering", cutoffs: { OC: 194, MBC: 192, BC: 193, BCM: 191, SC: 180 } },
        { id: 803, name: "Civil Engineering", cutoffs: { OC: 193, MBC: 190, BC: 191.5, BCM: 189, SC: 178 } },
    ]
  },
  {
    id: 9,
    code: 2709,
    name: "Horizon Institute of Engineering",
    ranking: 9,
    highestPackage: 30,
    description: "A growing institution with a focus on emerging fields like biotechnology and environmental engineering. It provides a holistic education with an emphasis on sustainability.",
    image: 'https://placehold.co/600x400.png',
    courses: [
        { id: 901, name: "Biotechnology", cutoffs: { OC: 192, MBC: 188, BC: 190, BCM: 187, SC: 175 } },
        { id: 902, name: "Environmental Engineering", cutoffs: { OC: 190, MBC: 186, BC: 188, BCM: 185, SC: 173 } },
        { id: 903, name: "Computer Science Engineering", cutoffs: { OC: 195, MBC: 193, BC: 194, BCM: 192, SC: 184 } },
    ]
  },
];
