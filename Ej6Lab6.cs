//a. Dado un monto, obtener los vuelos que hayan superado ese monto, ordenados por recaudación ascendentemente

//Sistema

public List<Vuelo> GetVuelosSuperenMonto (double monto)
{
	List<Vuelo> listaRet = new List<Vuelo>();
	
	foreach (Vuelo v in _vuelos)
	{
		if(v.Recaudacion > monto)
		{
			listaRet.Add(v);
		}
	}
	
	listaRet.Sort();
	return listaRet;
}

//Vuelo

public int CompareTo (Vuelo other)
{
	return _recaudacion.CompareTo(other.Recaudacion);
}

//Vuelo

public void CalcularRecaudación()
{
	
	if(_recaudacion.Equals(0))
	{
		double ganadoPorPasajes = CalcularDineroPasajes();
		double costoConsumo = _avion.CalcularCostoConsumo(_duracion);
		
		_recaudacion = ganadoPorPasajes - costoConsumo;
	}
}

//Vuelo

private double CalcularDineroPasajes()
{
	double costo = 0;
	
	foreach(Pasaje p in _pasajes)
	{
		costo += p.Precio;
	}
	return costo;
}

//Avion

public abstract double CalcularCostoConsumo(int duracion);

//Comun

public override double CalcularCostoConsumo (int duracion)
{
	return _valorHoraVuelo * duracion;
}

//Supersonico

public override double CalcularCostoConsumo (int duracion)
{
	return (_valorBaseHora * duracion) * _numeroMach;
}

//b. Dado el id de un cliente, obtener todos los aviones en los que ha viajado, si viajó más de una vez en el mismo avión, este no se debe repetir en la lista

//Sistema

public List<Avion> GetAvionesQueViajo (int idCliente)
{
	List<Avion> listaRet = new List<Avion>();
	
	foreach (Vuelo v in _vuelos)
	{
		if(v.ViajaCliente(idCliente))
		{
			if(!listaRet.Contains(v.Avion))//Redefino el Equals en Avion
			{
				listaRet.Add(v.Avion);
			}
		}
	}
	return listaRet;
}

//Vuelo 

public bool ViajaCliente (int idCliente)
{
	foreach(Pasaje p in _pasajes)
	{
		if(p.Cliente.Id.Equals(idCliente))
		{
			return true;
		}
	}
	return false;
}







