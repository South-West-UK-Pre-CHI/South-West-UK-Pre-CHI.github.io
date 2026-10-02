# frozen_string_literal: true

# Liquid 4 calls `tainted?`, which Ruby 3.3 removed.
# Jekyll 4 still pins Liquid 4, so this restores the harmless predicate locally.
class Object
  def tainted?
    false
  end
end unless Object.method_defined?(:tainted?)
