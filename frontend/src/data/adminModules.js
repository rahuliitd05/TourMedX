import {
  doctors,
  hospitals,
  testimonials,
  faqItems,
  tourismPackages,
  specialtyCards
} from './siteContent';

export const adminModuleConfigs = {
  doctors: {
    title: 'Doctors',
    endpoint: '/doctors',
    fallbackData: doctors,
    searchFields: ['name', 'specialty', 'biography'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'specialty', label: 'Specialty' },
      { name: 'qualifications', label: 'Qualifications', type: 'textarea' },
      { name: 'certifications', label: 'Certifications', type: 'textarea' },
      { name: 'experience', label: 'Years of Experience' },
      { name: 'biography', label: 'Biography', type: 'textarea' },
      { name: 'procedures', label: 'Procedures Performed', type: 'textarea' },
      { name: 'hospitals', label: 'Associated Hospitals', type: 'textarea' },
      { name: 'languages', label: 'Languages', type: 'textarea' },
      { name: 'photo', label: 'Photo', type: 'file' }
    ]
  },
  hospitals: {
    title: 'Hospitals',
    endpoint: '/hospitals',
    fallbackData: hospitals,
    searchFields: ['name', 'about', 'location'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'about', label: 'About', type: 'textarea' },
      { name: 'departments', label: 'Departments', type: 'textarea' },
      { name: 'services', label: 'Services', type: 'textarea' },
      { name: 'facilities', label: 'Facilities', type: 'textarea' },
      { name: 'location', label: 'Location' },
      { name: 'logo', label: 'Logo', type: 'file' },
      { name: 'images', label: 'Images', type: 'file' }
    ]
  },
  treatments: {
    title: 'Treatments',
    endpoint: '/treatments',
    fallbackData: specialtyCards.map((item) => ({
      ...item,
      overview: item.summary
    })),
    searchFields: ['title', 'slug', 'overview'],
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'slug', label: 'Slug' },
      { name: 'category', label: 'Category' },
      { name: 'overview', label: 'Overview', type: 'textarea' },
      { name: 'benefits', label: 'Benefits', type: 'textarea' },
      { name: 'procedure', label: 'Procedure', type: 'textarea' },
      { name: 'recovery', label: 'Recovery', type: 'textarea' },
      {
        name: 'faqs',
        label: 'FAQs (Question|Answer per line)',
        type: 'textarea'
      }
    ]
  },
  packages: {
    title: 'Tourism Packages',
    endpoint: '/packages',
    fallbackData: tourismPackages,
    searchFields: ['packageName', 'duration', 'price'],
    fields: [
      { name: 'packageName', label: 'Package Name' },
      { name: 'duration', label: 'Duration' },
      { name: 'itinerary', label: 'Day-wise Itinerary', type: 'textarea' },
      {
        name: 'includedServices',
        label: 'Included Services',
        type: 'textarea'
      },
      { name: 'price', label: 'Price' },
      { name: 'gallery', label: 'Gallery', type: 'file' }
    ]
  },
  testimonials: {
    title: 'Testimonials',
    endpoint: '/testimonials',
    fallbackData: testimonials,
    searchFields: ['name', 'location', 'quote'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'location', label: 'Location' },
      { name: 'quote', label: 'Quote', type: 'textarea' }
    ]
  },
  faqs: {
    title: 'FAQs',
    endpoint: '/faqs',
    fallbackData: faqItems,
    searchFields: ['question', 'answer'],
    fields: [
      { name: 'question', label: 'Question' },
      { name: 'answer', label: 'Answer', type: 'textarea' },
      { name: 'category', label: 'Category' }
    ]
  },
  contacts: {
    title: 'Contact Messages',
    endpoint: '/contacts',
    fallbackData: [],
    searchFields: ['name', 'email', 'country', 'treatment'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'country', label: 'Country' },
      { name: 'treatment', label: 'Treatment' },
      { name: 'message', label: 'Message', type: 'textarea' }
    ]
  },
  partners: {
    title: 'Partnership Requests',
    endpoint: '/partners',
    fallbackData: [],
    searchFields: ['name', 'organization', 'specialty', 'email'],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'organization', label: 'Organization' },
      { name: 'specialty', label: 'Specialty' },
      { name: 'phone', label: 'Phone' },
      { name: 'email', label: 'Email' },
      { name: 'message', label: 'Message', type: 'textarea' }
    ]
  },
  media: {
    title: 'Media Gallery',
    endpoint: '/media',
    fallbackData: [],
    searchFields: ['title', 'altText'],
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'altText', label: 'Alt Text' },
      { name: 'file', label: 'File', type: 'file' }
    ]
  }
};
