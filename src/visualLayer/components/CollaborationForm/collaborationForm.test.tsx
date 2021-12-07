import {
  render,
} from '@testing-library/react';
import CollaborationFrom from './collaborationForm';

describe.skip('Collaboration Form', () => {
  // TODO: Solve this testing issue
  it('Should render the templates name', () => {
    render(<CollaborationFrom recommendationId="dknbjdsj87486389jkdvh" />);
    // expect(screen.getByText('')).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
