import { mount } from '@vue/test-utils'
import Home from '@/views/Home';

describe('Home', () => {
  it('is a vue instance', () => {
    const wrapper = mount(Home);
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
});
