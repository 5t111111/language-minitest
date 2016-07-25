{basename} = require 'path'

module.exports =
  activate: (state) ->
    atom.workspace.observeTextEditors (editor) =>
      return unless @isMinitestFile(editor.getPath())
      editor.setGrammar(atom.grammars.grammarForScopeName('source.ruby.minitest'))

  deactivate: ->

  serialize: ->

  isMinitestFile: (filename) ->
    minitestFiletype = '_test.rb'
    basename(filename).slice(-minitestFiletype.length) == minitestFiletype
