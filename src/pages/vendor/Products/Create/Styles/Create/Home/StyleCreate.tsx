import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { StyleCreateContext } from '../Layout';

import { Input } from '@/components/forms';
import { ChangeInputEvent } from '@/interfaces';

import styles from './StyleCreate.module.scss';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';

export interface IAttribute {
  _id?: string;
  name: string;
  values: string[];
}

export function StyleCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { productId, styleId } = useParams();

  const { attributes, setAttributes, styleName, setStyleName } =
    useContext(StyleCreateContext);
  const [currentAttrIndex, setCurrentAttrIndex] = useState(-1);
  const [currentValueIndex, setCurrentValueIndex] = useState(-1);
  const [isDirty, setIsDirty] = useState(false);
  // const [isAttr]

  const onCreateAttrClick = () => {
    setAttributes([...attributes, { name: '', values: [] }]);
    setIsDirty(true);
  };

  const onStyleNameChange = (e: ChangeInputEvent) => {
    setStyleName(e.target.value);
    setIsDirty(true);
  };

  const onAttrNameChange = (attrIndex: number) => (e: ChangeInputEvent) => {
    setAttributes(
      attributes.map((attribute: IAttribute, index: number) =>
        index === attrIndex
          ? { ...attribute, name: e.target.value }
          : attribute,
      ),
    );
    setIsDirty(true);
  };

  const onAddValueClick = (attrIndex: number) => () => {
    setAttributes(
      attributes.map((attribute: IAttribute, index: number) =>
        index === attrIndex
          ? {
              ...attribute,
              values: [
                ...attribute.values,
                `${attribute.name}${attribute.values.length + 1}`,
              ],
            }
          : attribute,
      ),
    );
    setIsDirty(true);
  };

  const onEditValueClick = (attrIndex: number, vIndex: number) => {
    setCurrentAttrIndex(attrIndex);
    setCurrentValueIndex(vIndex);
    setIsDirty(true);
  };

  const onAttrValueChange =
    (attrIndex: number, vIndex: number) => (e: ChangeInputEvent) => {
      setAttributes(
        attributes.map((attribute: IAttribute, _attrIndex: number) =>
          attrIndex === _attrIndex
            ? {
                ...attribute,
                values: attribute.values.map((value: string, _vIndex: number) =>
                  _vIndex === vIndex ? e.target.value : value,
                ),
              }
            : attribute,
        ),
      );
      setIsDirty(true);
    };

  const onAttrValueBlur = () => {
    setCurrentAttrIndex(-1);
    setCurrentValueIndex(-1);
  };

  const onNextClick = () => {
    if (styleId !== 'create') {
      if (!isDirty) {
        return navigate('attribute');
      }
      return HttpService.put(`/styles/${styleId}`, {
        name: styleName,
        attributes,
      }).then(response => {
        const { status } = response;
        if (status === 200) {
          enqueueSnackbar('Attributes saved!', { variant: 'success' });
          return navigate('attribute');
        }
      });
    }
    HttpService.post(
      `/styles`,
      {
        name: styleName,
        attributes,
      },
      { productId },
    ).then(response => {
      const { status, styleId } = response;
      if (status === 200) {
        enqueueSnackbar('Attributes saved!', { variant: 'success' });
        navigate(pathname.replace('create', `${styleId}/attribute`));
      }
    });
  };

  useEffect(() => {
    if (styleId === 'create') {
      setAttributes([]);
      setStyleName('');
      setCurrentAttrIndex(-1);
      setCurrentValueIndex(-1);
      return;
    }
    HttpService.get(`/styles/${styleId}`).then(response => {
      const { status, style } = response;
      if (status === 200) {
        setAttributes(style.attributes || []);
        setStyleName(style.name || '');
      }
    });
  }, [productId, styleId]);

  return (
    <div className={styles.container}>
      <div className={styles.addAttr}>
        <div className={styles.control}>
          <p>Style Name</p>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Beeded"
            value={styleName}
            updateValue={onStyleNameChange}
          />
        </div>
        <button className={styles.button} onClick={onCreateAttrClick}>
          New Attribute
        </button>
      </div>
      <div className={styles.form}>
        {attributes.map((attribute: IAttribute, attrIndex: number) => (
          <div className={styles.attribute} key={attrIndex}>
            <div className={styles.control}>
              <p>Attribute Name</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Size"
                className={styles.attrNameInput}
                value={attribute.name}
                updateValue={onAttrNameChange(attrIndex)}
              />
            </div>
            <div className={styles.control}>
              <p>Attribute Values</p>
              <div className={styles.sizeBar}>
                {attribute.values.map((value: string, vIndex: number) =>
                  currentAttrIndex === attrIndex &&
                  currentValueIndex === vIndex ? (
                    <Input
                      value={value}
                      updateValue={onAttrValueChange(attrIndex, vIndex)}
                      onBlur={onAttrValueBlur}
                    />
                  ) : (
                    <span
                      key={value}
                      onClick={() => onEditValueClick(attrIndex, vIndex)}
                    >
                      {value}
                    </span>
                  ),
                )}
                <button
                  className={styles.addButton}
                  onClick={onAddValueClick(attrIndex)}
                >
                  Add {attribute.name}
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button} onClick={onNextClick}>
          Next
        </button>
      </div>
    </div>
  );
}
