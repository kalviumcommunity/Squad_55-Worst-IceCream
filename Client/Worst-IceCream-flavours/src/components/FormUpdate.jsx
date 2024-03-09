import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function App() {
  const [submission, setSubmission] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await axios.post('https://squad-55-worst-icecream-isharode.onrender.com/update/', data);
      setSubmission(true);
      reset();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='contain'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='app'>
            {submission && <p className='data'>Data submitted! </p>}

            <label>Ice Cream name :</label>
            <input
              className='inp'
              type='text'
              name='flavour'
              {...register('flavour', { required: 'Flavour is required' })}
            />
            {errors.flavour && <p className='err'>{errors.flavour.message}</p>}

            <label>Taste :</label>
            <input
              className='inp'
              type='text'
              name='taste'
              {...register('taste', { required: 'Taste is required' })}
            />
            {errors.taste && <p className='err'>{errors.taste.message}</p>}

            <label>Color:</label>
            <input
              className='inp'
              type='text'
              name='color'
              {...register('color', { required: 'Color is required' })}
            />
            {errors.color && <p className='err'>{errors.color.message}</p>}

            <label>Rating :</label>
            <input
              type='number'
              name='rating'
              {...register('rating', { required: 'Rating is Required!' })}
            />
            {errors.rating && <p className='err'>{errors.rating.message}</p>}

            <label>Image URL:</label>
            <input
              type='text'
              name='image'
              {...register('image', { required: 'Image is Required!' })}
            />
            {errors.image && <p className='err'>{errors.image.message}</p>}

            <input type='submit' value='Update' className='button' />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;