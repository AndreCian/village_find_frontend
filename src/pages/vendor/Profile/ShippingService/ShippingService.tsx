import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { Card } from '@/components/common';
import { Radio, RadioGroup } from '@/components/forms';
import { HttpService } from '@/services';

import styles from './ShippingService.module.scss';

const BACKPATH = '/vendor/profile';
const uspsServices = [
  { "name": "First Class Package Service", "value": "usps_first" },
  { "name": "Priority Mail", "value": "usps_priority" },
  { "name": "Priority Mail Express", "value": "usps_priority_express" },
  { "name": "Parcel Select", "value": "usps_parcel_select" },
  { "name": "Media Mail", "value": "usps_media_mail" },
  { "name": "Library Mail", "value": "usps_library_mail" },
  { "name": "First Class Package International Service", "value": "usps_first_class_international" },
  { "name": "Priority Mail International", "value": "usps_priority_international" },
  { "name": "Priority Mail Express International", "value": "usps_express_international" },
  { "name": "Ground Advantage", "value": "usps_ground_advantage" }
]

const upsServices = [
  { "name": "Ground", "value": "ups_ground" },
  { "name": "Ground Saver", "value": "ups_ground_saver" },
  { "name": "3 Day Select", "value": "ups_3_day_select" },
  { "name": "2nd Day Air", "value": "ups_2nd_day_air" },
  { "name": "2nd Day Air AM", "value": "ups_2nd_day_air_am" },
  { "name": "Next Day Air Saver", "value": "ups_next_day_air_saver" },
  { "name": "Next Day Air", "value": "ups_next_day_air" },
  { "name": "Next Day Air Early AM", "value": "ups_next_day_air_early_am" },
  { "name": "Worldwide Expedited", "value": "ups_worldwide_expedited" },
  { "name": "Worldwide Saver", "value": "ups_worldwide_saver" },
  { "name": "Worldwide Express", "value": "ups_worldwide_express" },
  { "name": "Worldwide Express Plus", "value": "ups_worldwide_express_plus" },
  { "name": "Mail Innovations", "value": "ups_mail_innovations" }
]

const fedExServices = [
  { "name": "Ground Economy", "value": "fedex_ground_economy" },
  { "name": "International Connect Plus (FICP)", "value": "fedex_international_connect_plus" },
  { "name": "Express Saver", "value": "fedex_express_saver" },
  { "name": "2 Day", "value": "fedex_2_day" },
  { "name": "2 Day AM", "value": "fedex_2_day_am" },
  { "name": "Standard Overnight", "value": "fedex_standard_overnight" },
  { "name": "First Overnight", "value": "fedex_first_overnight" },
  { "name": "Priority Overnight", "value": "fedex_priority_overnight" },
  { "name": "Home Delivery", "value": "fedex_home_delivery" },
  { "name": "Ground", "value": "fedex_ground" },
  { "name": "International Economy", "value": "fedex_international_economy" },
  { "name": "International Priority", "value": "fedex_international_priority" },
  { "name": "International First", "value": "fedex_international_first" },
  { "name": "SmartPost", "value": "fedex_smartpost" }
];

export function ShippingService() {
  const navigate = useNavigate();
  const [services, setServices] = useState<string[]>([]);

  const onServiceChange = (value: string) => {
    if (services.includes(value)) {
      setServices(services.filter(item => item !== value));
    } else {
      setServices([...services, value]);
    }
  };

  const onCancelClick = () => {
    navigate(BACKPATH);
  };

  const onUpdateClick = () => {
    HttpService.put('/user/vendor/profile/shipping/service', { services }).then(
      response => {
        const { status } = response;
        if (status === 200) {
          enqueueSnackbar('Shipping services updated.', { variant: 'success' });
        }
      },
    );
  };

  useEffect(() => {
    HttpService.get('/user/vendor/profile/shipping/service').then(response => {
      setServices(response || []);
    });
  }, []);

  return (
    <Card title="Shipping Services" className={styles.root}>
      <div className={styles.container}>
        <p>
          Select all of the shipping services that apply to your business needs
        </p>
        <div className={styles.subservice}>
          <div className={styles.ups}>
            <div className={styles.subUps}>
              <h3>USPS</h3>
              <RadioGroup
                value={services}
                className={styles.radioGroup}
                multiple={true}
                updateValue={onServiceChange}
              >
                {uspsServices.map((service: { name: string, value: string }, index: number) => (
                  <Radio
                    key={index}
                    label={service.name}
                    value={service.value}
                    size="small"
                  />
                ))}
              </RadioGroup>
            </div>
            <div className={styles.subUps}>
              <h3>UPS</h3>
              <RadioGroup
                value={services}
                className={styles.radioGroup}
                multiple={true}
                updateValue={onServiceChange}
              >
                {upsServices.map((service: { name: string, value: string }, index: number) => (
                  <Radio
                    key={index}
                    label={service.name}
                    value={service.value}
                    size="small"
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className={styles.fedex}>
            <h3>FedEx</h3>
            <RadioGroup
              className={styles.radioGroup}
              multiple={true}
              value={services}
              updateValue={onServiceChange}
            >
              {fedExServices.map((service: { name: string, value: string }, index: number) => (
                <Radio
                  key={index}
                  label={service.name}
                  value={service.value}
                  size="small"
                />
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={onCancelClick}>Cancel</button>
          <button className={styles.updateBtn} onClick={onUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </Card>
  );
}
