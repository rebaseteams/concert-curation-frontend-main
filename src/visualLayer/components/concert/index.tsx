/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import {
  Form,
  Button,
  notification,
} from 'antd';
import './concert.scss';
import myForm from './utils/myForm.json';
import { ConcertFormProp } from './util';
import createConcertFormData from './utils/createConcertFormData';
import { onSubmitFormDataType } from '../../../model/types/concertForm';
import { QuestionsUI } from '../../../model/types/questions';
import renderFormFields from '../FormRenderer';
import { ArtistBudget } from '../../../model/types/concertDataResponse';
import { FormFields } from '../../../model/types/formRenderer';

const ConcertForm = ({
  setVisible,
  forms,
  addNewRecommendation,
  validateRecommendationFields,
  venuesService,
  eventsTypeService,
  brandsService,
  genresService,
} : ConcertFormProp): JSX.Element => {
  const [budget, setBudget] = useState<ArtistBudget>({ min: 20000, max: 50000 });
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState<Array<{id: string, name: string}>>([]);
  const [eventsType, setEventsType] = useState<Array<{id: string, name: string}>>([]);
  const [allBrands, setAllBrands] = useState<Array<{id: string, name: string}>>([]);
  const [allGenres, setAllGenres] = useState<Array<{id: string, name: string}>>([]);
  const [wantedBrands, setWantedBrands] = useState<Array<string>>([]);
  const [unWantedBrands, setUnWantedBrands] = useState<Array<string>>([]);

  const onBudgetChange = (event: Array<number>) => {
    setBudget({ min: event[0], max: event[1] });
  };

  const getVenueList = async () => {
    try {
      const resp = await venuesService.getAllVenues();
      if (resp.success) {
        const venueOptions = resp.data.venues.map((v) => ({ id: v.id, name: `${v.name}, ${v.city}` }));
        setVenues(venueOptions);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Cannot fetch venue list',
      });
    }
  };
  const getEventsTypeList = async () => {
    try {
      const resp = await eventsTypeService.getAll();
      if (resp.success) {
        // eslint-disable-next-line max-len
        const eventsTypeOptions = resp.data.eventsType.map((et) => ({ id: et.id, name: et.name }));
        setEventsType(eventsTypeOptions);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Cannot fetch events type list',
      });
    }
  };
  const getAllBrandsList = async () => {
    try {
      const resp = await brandsService.getAll();
      if (resp.success) {
        // eslint-disable-next-line max-len
        const brandsOptions = resp.data.brands.map((b) => ({ id: b.id, name: b.name }));
        setAllBrands(brandsOptions);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Cannot fetch brands list',
      });
    }
  };
  const getAllGenresList = async () => {
    try {
      const resp = await genresService.getAll();
      if (resp.success) {
        const genreOptions = resp.data.genres.map((g) => ({ id: g.id, name: g.name }));
        setAllGenres(genreOptions);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Cannot fetch genre list',
      });
    }
  };
  const validateEventName = async (eventName: string) => {
    try {
      const resp = await validateRecommendationFields({ eventName: eventName.trim() });
      if (!resp.success) return false;
      return resp.data.nameAvailable;
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Cannot validate event name',
      });
      return false;
    }
  };
  const eventNameValidator = (rule: any, value: any, callback: any) => {
    validateEventName(value).then((res) => {
      if (!value || res) return callback();
      return callback('Name already taken');
    });
  };
  useEffect(() => {
    getVenueList();
    getEventsTypeList();
    getAllBrandsList();
    getAllGenresList();
  }, []);

  const form: FormFields[] = myForm.map((f) => {
    if (f.name === 'concertName') {
      return {
        ...f,
        validator: eventNameValidator,
      };
    }
    if (f.name === 'artistBudget') {
      return {
        ...f,
        sliderValue: budget,
        onChange: onBudgetChange,
      };
    }
    if (f.name === 'venue') {
      return {
        ...f,
        selectOptionsWithValue: venues,
      };
    }
    if (f.name === 'eventType') {
      return {
        ...f,
        selectOptionsWithValue: eventsType,
      };
    }
    if (f.name === 'wantedBrands') {
      return {
        ...f,
        selectOptionsWithValue: allBrands.filter((l) => !unWantedBrands.includes(l.id)),
      };
    }
    if (f.name === 'unwantedBrands') {
      return {
        ...f,
        selectOptionsWithValue: allBrands.filter((l) => !wantedBrands.includes(l.id)),
      };
    }
    if (f.name === 'genre') {
      return {
        ...f,
        selectOptionsWithValue: allGenres,
      };
    }
    return f;
  });

  const handleFieldChange = (field: any) => {
    if (field[0].name[0] === 'wantedBrands') {
      setWantedBrands(field[0].value);
    }
    if (field[0].name[0] === 'unwantedBrands') {
      setUnWantedBrands(field[0].value);
    }
  };

  const onFormSubmit = async (values: onSubmitFormDataType) => {
    setLoading(true);
    const mappingData = {
      budget,
      allGenres,
    };
    const result: QuestionsUI = createConcertFormData(values, mappingData);
    const response = await addNewRecommendation(result);
    if (response.error) {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: 'Error',
        description: 'Could not create concert',
      });
      return;
    }
    if (response.data && !('id' in response.data)) {
      setLoading(false);
      setVisible(false);
      notification.error({
        message: 'Error',
        description: 'Could not create concert',
      });
      return;
    }
    if (response.data && ('id' in response.data)) {
      forms.unshift(response.data);
      setLoading(false);
      setVisible(false);
      notification.success({
        message: 'Success',
        description: 'Concert Successfully created',
      });
      return;
    }
    setVisible(false);
    setLoading(false);
  };

  return (
    <div className="concert-container">
      <Form
        id="qustionsForm"
        layout="vertical"
        initialValues={{ size: 1000 }}
        onFinish={onFormSubmit}
        onFieldsChange={handleFieldChange}
      >
        { form && renderFormFields(form) }
        { loading && <Button disabled className="submit" htmlType="submit" type="primary">Submiting</Button> }
        { !loading && <Button className="submit" htmlType="submit" type="primary">Submit</Button> }
      </Form>
    </div>
  );
};

export default ConcertForm;
