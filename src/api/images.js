import api from './api';

const API_KEY = '31085485-d3b506dd28137d49a12c009f9';

const getAllImages = async (query, page) => {
  const { data } = await api({
    params: {
      q: query,
      page: page,
      key: API_KEY,
      per_page: 12,
      orientation: 'horizontal',
      image_type: 'photo',
    },
  });

  return data;
};

export default getAllImages;
