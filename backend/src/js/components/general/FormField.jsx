import React, { PropTypes } from 'react';

const FormField = ({
  title,
  help,
  placeholder,
  type,
  className,
  value,
  onChange,
  prefix,
  suffix,
  id,
  required,
}) => {
  const htmlId = id || `input-${Math.round(Math.random() * 1000)}`;

  const changeHandler = event => onChange(event.target.value);

  return (
    <div className="form-group">
      <label htmlFor={htmlId}>
        {title}
      </label>

      <div className="input-group">
        {prefix &&
          <div className="input-group-addon">
            {prefix}
          </div>
        }

        {
          type !== 'textarea'
          ?
            <input
              type={type}
              className={`form-control ${className}`}
              id={htmlId}
              aria-describedby={`${htmlId}-help`}
              placeholder={placeholder || `Enter the ${title}`}
              value={value || ''}
              onChange={changeHandler}
              required={required ? 'required' : ''}
            />
          :
            <textarea
              className={`form-control ${className}`}
              id={htmlId}
              aria-describedby={`${htmlId}-help`}
              placeholder={placeholder}
              value={value || ''}
              onChange={changeHandler}
              required={required ? 'required' : ''}
            />
        }

        {suffix &&
          <div className="input-group-addon">
            {suffix}
          </div>
        }
      </div>

      {help &&
        <small id={`${htmlId}-help`} className="form-text text-muted">
          {help}
        </small>
      }
    </div>
  );
};

FormField.propTypes = {
  title: PropTypes.string.isRequired,
  help: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
};


export default FormField;
