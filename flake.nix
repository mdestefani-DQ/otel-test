{
  description = "Nix flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:Nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ...}: let
    system = "aarch64-darwin";
    in {
      devShells.${system}.default = let
        pkgs = import nixpkgs {
          inherit system;
        };

      in pkgs.mkShell {
        packages = with pkgs; [
          just
          mprocs
          nodejs_22
        ];
        shellHook = ''
          # root node binaries
          export PATH="$PATH:$(realpath ./node_modules/.bin)"

          # apps and packages node binaries
          export PATH="$PATH:$(realpath ./{apps,packages}/*/node_modules/.bin | tr '\n' ':')"

          # print available commands
          just --list
        '';
      };
    };
}
