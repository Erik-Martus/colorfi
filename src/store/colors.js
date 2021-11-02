import themeLib from '../data/themes.json';
import { genColorId, genHex, initColors, calcShades } from '../js/colorFuncs';

const initialCount = 5;

const initialState = {
  colors: initColors(initialCount),
  colorCount: initialCount + 1,
  themes: themeLib,
};

export function themeReducer(state = initialState, action) {
  switch (action.type) {
    case THEME_CHANGED:
      return {
        ...state,
        colors: themeLib[action.payload].colors,
      };
    case COLOR_ADDED: {
      const id = genColorId();
      const name = `Color${state.colorCount}`;
      const hex = genHex();
      const amount = 9;
      const baseIndex = 4;
      const hue = 0;
      const sat = 0;
      const light = 5;
      const shades = calcShades({
        hex: hex,
        shades: {
          amount: amount,
          baseIndex: baseIndex,
          hue: hue,
          saturation: sat,
          lightness: light,
        },
      });
      return {
        ...state,
        colors: {
          ...state.colors,
          [id]: {
            id: id,
            name: name,
            hex: genHex(),
            shades: {
              enabled: false,
              amount: amount,
              baseIndex: baseIndex,
              hue: hue,
              saturation: sat,
              lightness: light,
              colors: shades,
            },
          },
        },
        colorCount: state.colorCount + 1,
      };
    }
    case COLOR_DELETED: {
      const { [action.payload]: remove, ...remainingColors } = state.colors;
      return { ...state, colors: remainingColors };
    }
    case COLOR_NAME_UPDATED:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: {
            ...state.colors[action.payload.id],
            name: action.payload.value,
          },
        },
      };
    case COLOR_HEX_UPDATED: {
      const color = state.colors[action.payload.id];
      color.hex = action.payload.value;
      color.shades.colors = calcShades(color);
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: color,
        },
      };
    }
    case COLOR_SHADES_TOGGLED:
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: {
            ...state.colors[action.payload.id],
            shades: {
              ...state.colors[action.payload.id].shades,
              enabled: action.payload.value,
            },
          },
        },
      };
    case COLOR_SHADES_UPDATED: {
      const color = state.colors[action.payload.id];
      const props = Object.keys(action.payload.value);
      const values = Object.values(action.payload.value);
      props.map((prop, index) => {
        color.shades[prop] = values[index];
      });
      color.shades.colors = calcShades(color);
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.payload.id]: color,
        },
      };
    }
    default:
      return state;
  }
}

// selectors
export const getColors = (state) => state.theme.colors;
export const getColorCount = (state) => state.theme.colorCount;
export const getThemes = (state) => state.theme.themes;

// action types
export const THEME_CHANGED = 'theme/themeChange';
export const COLOR_ADDED = 'theme/colorAdd';
export const COLOR_DELETED = 'theme/colorDelete';
export const COLOR_NAME_UPDATED = 'theme/colorNameUpdated';
export const COLOR_HEX_UPDATED = 'theme/colorHexUpdated';
export const COLOR_SHADES_TOGGLED = 'theme/colorShadesToggled';
export const COLOR_SHADES_UPDATED = 'theme/colorShadesUpdated';

// action creators
export const changeTheme = (theme) => ({
  type: THEME_CHANGED,
  payload: theme,
});

export const addColor = () => ({
  type: COLOR_ADDED,
});

export const deleteColor = (id) => ({
  type: COLOR_DELETED,
  payload: id,
});

export const updateColorName = (id, value) => ({
  type: COLOR_NAME_UPDATED,
  payload: { id, value },
});

export const updateColorHex = (id, value) => ({
  type: COLOR_HEX_UPDATED,
  payload: { id, value },
});

export const toggleColorShades = (id, value) => ({
  type: COLOR_SHADES_TOGGLED,
  payload: { id, value },
});

export const updateColorShades = (id, value) => ({
  type: COLOR_SHADES_UPDATED,
  payload: { id, value },
});
