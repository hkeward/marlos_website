import { mount } from '@vue/test-utils'
import Home from '../../src/views/Home';

describe('Home', () => {
  it('is a vue instance', () => {
    const wrapper = mount(Home);
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
});
