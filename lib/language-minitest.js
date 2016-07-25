'use babel';

import LanguageMinitestView from './language-minitest-view';
import { CompositeDisposable } from 'atom';

export default {

  languageMinitestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageMinitestView = new LanguageMinitestView(state.languageMinitestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageMinitestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-minitest:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageMinitestView.destroy();
  },

  serialize() {
    return {
      languageMinitestViewState: this.languageMinitestView.serialize()
    };
  },

  toggle() {
    console.log('LanguageMinitest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
