import {
  handleModal,
  showOrHideModal
} from '../../src/client/app/actions/modalActions';

describe('modalActions', () => {
    describe('showOrHideModal', () => {
        it('should return a type TOGGLE_MODAL', () => {
            const { type } = showOrHideModal();

            expect(type).toBe('TOGGLE_MODAL');
        });

        it('should pass the val as data', () => {
            const { data } = showOrHideModal('test');

            expect(data.showModal).toBe('test');
        });
    });

    describe('handleModal', () => {
        it('should invert passed val and pass it to showOrHideModal', () => {
            const dispatch = ({ data }) => expect(data.showModal).toBe(false);

            handleModal(true)(dispatch);
        });
    });
});

