class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def new
        pokemon = Pokemon.new
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end

    private

    def poke_params(params)
        
    end

end
